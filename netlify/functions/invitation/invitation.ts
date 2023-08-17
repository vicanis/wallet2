import { Handler } from "@netlify/functions";
import { MongoClient, TransactionOptions } from "mongodb";
import crypto, { UUID } from "crypto";
import { Event } from "@netlify/functions/dist/function/event";
import { Context } from "@netlify/functions/dist/function/context";
import withAuth from "../../../src/hooks/auth";
import { ParseUserId, ParseUserName } from "../../../src/lib/auth";
import type { Invitation } from "../../../src/types/invitation";
import type { User } from "../../../src/types/user";

export const handler: Handler = withAuth(async (event, context) => {
    const response = await router(event, context);

    if (!response) {
        console.error("no response");

        return {
            statusCode: 500,
        };
    }

    return response;
});

const router = async (event: Event, context: Context) => {
    const qsa = event.queryStringParameters ?? {};

    switch (event.httpMethod) {
        case "GET":
            return getInvitation(event, context);

        case "POST":
            return createInvitation(event, context);

        case "PATCH":
            const { action = "join" } = qsa as {
                action: "join" | "drop";
            };

            switch (action) {
                case "join":
                    return joinInvitation(event, context);

                case "drop":
                    return dropInvitation(event, context);
            }
            break;

        case "DELETE":
            return deleteInvitation(event, context);
    }

    return {
        statusCode: 405,
    };
};

const getInvitation: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");
    const coll = db.collection<Invitation>("invitation");

    const qsa = event.queryStringParameters ?? {};

    const { token } = qsa as {
        token?: UUID;
    };

    try {
        const user = ParseUserId(context.clientContext);

        const item = await coll.findOne({
            $or: [{ token }, { author: user }, { users: user }],
        });

        if (item === null) {
            return {
                statusCode: 200,
                body: JSON.stringify(item),
            };
        }

        const my = item.author === user;

        const invitation: Partial<Invitation<string>> & {
            my: boolean;
            joined?: boolean;
        } = {
            my,
            token: item.token,
            author: item.author,
            users: item.users,
        };

        if (!my) {
            invitation.joined = item.users.indexOf(user) !== -1;
            delete invitation.users;
        }

        const cursor = db.collection<User>("users").find({
            user: {
                $in: [...item.users, item.author],
            },
        });

        while (true) {
            const item = await cursor.next();
            if (item === null) {
                break;
            }

            if (item.user === invitation.author) {
                invitation.author = item.name;
            }

            if (typeof invitation.users !== "undefined") {
                for (let i = 0; i < invitation.users.length; i++) {
                    if (item.user === invitation.users[i]) {
                        invitation.users[i] = item.name;
                        break;
                    }
                }
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(invitation),
        };
    } catch (e) {
        console.error("get invitation failed", e);

        return {
            statusCode: 500,
            body: e.toString,
        };
    } finally {
        mongoclient.close();
    }
};

const createInvitation: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");
    const coll = db.collection<Invitation>("invitation");

    const session = mongoclient.startSession();

    try {
        session.startTransaction(TransactionOptions);

        const user = ParseUserId(context.clientContext);
        const name = ParseUserName(context.clientContext);

        const invitation: Invitation = {
            author: user,
            token: crypto.randomUUID(),
            created: new Date(),
            users: [],
        };

        await coll.insertOne(invitation, { session });

        await db.collection<User>("users").updateOne(
            { user },
            { $set: { user, name } },
            {
                upsert: true,
                session,
            }
        );

        await session.commitTransaction();

        return {
            statusCode: 200,
        };
    } catch (e) {
        await session.abortTransaction();

        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }
};

const joinInvitation: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");

    const qsa = event.queryStringParameters ?? {};

    const { token } = qsa as {
        token?: UUID;
    };

    const session = mongoclient.startSession({});

    try {
        session.startTransaction(TransactionOptions);

        const user = ParseUserId(context.clientContext);
        const name = ParseUserName(context.clientContext);

        await db.collection<Invitation>("invitation").updateOne(
            { token },
            {
                $addToSet: {
                    users: user,
                },
            },
            { session }
        );

        await db.collection<User>("users").updateOne(
            { user },
            {
                $set: {
                    user,
                    name,
                },
            },
            {
                upsert: true,
                session,
            }
        );

        await session.commitTransaction();

        return {
            statusCode: 200,
        };
    } catch (e) {
        await session.abortTransaction();

        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }
};

const dropInvitation: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");

    try {
        const user = ParseUserId(context.clientContext);

        const invitation = await db
            .collection<Invitation>("invitation")
            .findOne({
                users: user,
            });

        if (invitation === null) {
            return {
                statusCode: 204,
            };
        }

        await db.collection<Invitation>("invitation").updateOne(
            {
                _id: invitation._id,
            },
            {
                $pull: {
                    users: user,
                },
            }
        );

        return {
            statusCode: 200,
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }
};

const deleteInvitation: Handler = async (event, context) => {
    const user = ParseUserId(context.clientContext);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");
    const coll = db.collection<Invitation>("invitation");

    try {
        await coll.deleteOne({
            author: user,
        });

        return {
            statusCode: 200,
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString,
        };
    } finally {
        mongoclient.close();
    }
};

const TransactionOptions: TransactionOptions = {
    readPreference: "primary",
    readConcern: {
        level: "local",
    },
    writeConcern: {
        w: "majority",
    },
};
