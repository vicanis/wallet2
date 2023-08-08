import { Handler } from "@netlify/functions";
import { Filter, MongoClient } from "mongodb";
import crypto, { UUID } from "crypto";
import { ParseUserId, ParseUserName } from "../../../src/lib/auth";
import type { Invitation } from "../../../src/types/invitation";

export const handler: Handler = async (event, context) => {
    const user = ParseUserId(context.clientContext);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");
    const coll = db.collection<Invitation>("invitation");

    const qsa = event.queryStringParameters ?? {};

    const { token } = qsa as {
        token?: UUID;
    };

    switch (event.httpMethod) {
        case "GET":
            const filter: Filter<Invitation> = {};

            if (typeof token !== "undefined") {
                filter.token = token;
            } else {
                filter["author.id"] = user;
            }

            try {
                const item = await coll.findOne(filter);

                if (typeof token !== "undefined" && item !== null) {
                    const { token, author, users } = item;

                    return {
                        statusCode: 200,
                        body: JSON.stringify({
                            token,
                            author,
                            joined: users.indexOf(user) !== -1,
                        }),
                    };
                }

                return {
                    statusCode: 200,
                    body: JSON.stringify(item),
                };
            } catch (e) {
                return {
                    statusCode: 500,
                    body: e.toString,
                };
            } finally {
                mongoclient.close();
            }
            break;

        case "POST":
            try {
                const name = ParseUserName(context.clientContext);

                const invitation: Invitation = {
                    author: {
                        id: user,
                        name,
                    },
                    token: crypto.randomUUID(),
                    created: new Date(),
                    users: [],
                };

                await coll.insertOne(invitation);

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
            break;

        case "PATCH":
            try {
                await coll.updateOne(
                    { token },
                    {
                        $push: {
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
            break;

        case "DELETE":
            try {
                await coll.deleteOne({
                    "author.id": user,
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
            break;
    }

    return {
        statusCode: 405,
    };
};
