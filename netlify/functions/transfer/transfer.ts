import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";
import { Context } from "@netlify/functions/dist/function/context";
import { Event } from "@netlify/functions/dist/function/event";
import type { Transfer, TransferItem } from "../../../src/types/transfer";
import { ParseUserId } from "../../../src/lib/auth";
import { Wallet } from "../../../src/types/wallet";
import { Amount } from "../../../src/types/amount";
import { User } from "../../../src/types/user";
import GetSharedUsers from "../../../src/lib/user";
import { DefaultTransactionOptions } from "../../../src/lib/transaction";

export const handler: Handler = async (event, context) => {
    const response = await router(event, context);

    if (!response) {
        console.error("no response");

        return {
            statusCode: 500,
        };
    }

    return response;
};

const router = async (event: Event, context: Context) => {
    const qsa = event.queryStringParameters;

    switch (event.httpMethod) {
        case "GET":
            if (qsa !== null) {
                const { mode } = qsa;

                if (mode === "list") {
                    return getTransferHistory(event, context);
                }

                return {
                    statusCode: 400,
                };
            }

            return getTransfer(event, context);

        case "POST":
            return createTransfer(event, context);
    }

    return {
        statusCode: 405,
    };
};

const getTransferHistory: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");

    try {
        const sessionUser = ParseUserId(context.clientContext);
        const sharedUsers = await GetSharedUsers(sessionUser);

        const data: TransferItem[] = [];

        const [transfers, wallets, users] = await Promise.all([
            db
                .collection<Transfer>("transfer")
                .find(
                    {
                        user: {
                            $in: [...sharedUsers, sessionUser],
                        },
                    },
                    {
                        sort: {
                            date: -1,
                        },
                    }
                )
                .toArray(),
            db
                .collection<Wallet>("wallet")
                .find({
                    user: {
                        $in: [...sharedUsers, sessionUser],
                    },
                })
                .toArray(),
            db
                .collection<User>("users")
                .find({
                    user: {
                        $in: [...sharedUsers, sessionUser],
                    },
                })
                .toArray(),
        ]);

        for (const transfer of transfers) {
            const item: Partial<TransferItem> = {};

            for (const { _id, name, icon, color } of wallets) {
                for (const key of ["src", "dst"]) {
                    if (typeof transfer[key] !== "undefined") {
                        if (transfer[key].toString() === _id.toString()) {
                            item[key] = { name, icon, color };
                            break;
                        }
                    }
                }
            }

            if (typeof transfer.user !== "undefined") {
                for (const user of users) {
                    if (
                        user.user !== sessionUser &&
                        user.user === transfer.user
                    ) {
                        item.user = user.name;
                        break;
                    }
                }
            }

            item.date = transfer.date;
            item.amount = transfer.amount as Required<Amount>;

            data.push(item as TransferItem);
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }

    return {
        statusCode: 200,
    };
};

const getTransfer: Handler = async (event, context) => {
    return {
        statusCode: 200,
    };
};

const createTransfer: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    const item: Transfer = JSON.parse(event.body);
    const user = ParseUserId(context.clientContext);

    item.user = user;
    item.date = new Date(item.date);
    item.src = new ObjectId(item.src);
    item.dst = new ObjectId(item.dst);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");

    const session = mongoclient.startSession();

    try {
        session.startTransaction(DefaultTransactionOptions);

        const src = item.src!;
        const dst = item.dst!;

        const value = item.amount.value!;

        await db
            .collection<Wallet>("wallet")
            .updateOne({ _id: src }, { $inc: { value: -value } }, { session });

        await db
            .collection<Wallet>("wallet")
            .updateOne({ _id: dst }, { $inc: { value } }, { session });

        await db.collection<Transfer>("transfer").insertOne(item, { session });

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

    return {
        statusCode: 200,
    };
};
