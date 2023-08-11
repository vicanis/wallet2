import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import { Context } from "@netlify/functions/dist/function/context";
import { Event } from "@netlify/functions/dist/function/event";
import type { Transfer, TransferItem } from "../../../src/types/transfer";
import { ParseUserId } from "../../../src/lib/auth";
import { Wallet } from "../../../src/types/wallet";
import { Amount } from "../../../src/types/amount";
import { User } from "../../../src/types/user";

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
        const data: TransferItem[] = [];

        const [transfers, wallets, users] = await Promise.all([
            db
                .collection<Transfer>("transfer")
                .find(
                    {},
                    {
                        sort: {
                            date: -1,
                        },
                    }
                )
                .toArray(),
            db.collection<Wallet>("wallet").find({}).toArray(),
            db.collection<User>("users").find({}).toArray(),
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
                    if (user.user === transfer.user) {
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
    const coll = db.collection<Transfer>("transfer");

    try {
        await coll.insertOne(item);
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
