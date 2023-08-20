import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import dayjs from "../../../src/lib/dayjs";
import { Context } from "@netlify/functions/dist/function/context";
import { Event } from "@netlify/functions/dist/function/event";
import type {
    Transfer,
    TransferGroup,
    TransferItem,
} from "../../../src/types/transfer";
import withAuth from "../../../src/hooks/auth";
import { ParseUserId } from "../../../src/lib/auth";
import { Wallet } from "../../../src/types/wallet";
import { User } from "../../../src/types/user";
import GetSharedUsers from "../../../src/lib/user";
import { DefaultTransactionOptions } from "../../../src/lib/transaction";
import { GetExchangeRate } from "../../../src/lib/exchange";
import SortReverse from "../../../src/lib/reverse";
import { UUID } from "crypto";

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

        const boundaries: Date[] = [];

        for (let i = 12; i >= -2; i--) {
            boundaries.push(dayjs().startOf("day").subtract(i, "day").toDate());
        }

        let [groups, wallets, users] = await Promise.all([
            db
                .collection("transfer")
                .aggregate<TransferGroup>([
                    {
                        $match: {
                            user: { $in: [...sharedUsers, sessionUser] },
                        },
                    },
                    { $sort: { date: -1 } },
                    { $limit: 100 },
                    {
                        $bucket: {
                            groupBy: "$date",
                            boundaries,
                            default: "other",
                            output: {
                                items: {
                                    $push: {
                                        id: "$_id",
                                        src: "$src",
                                        dst: "$dst",
                                        amount: "$amount",
                                        amountDst: "$amountDst",
                                        user: "$user",
                                    },
                                },
                            },
                        },
                    },
                    { $set: { date: "$_id" } },
                    { $unset: "_id" },
                ])
                .toArray(),
            db
                .collection<Wallet>("wallet")
                .find({
                    user: { $in: [...sharedUsers, sessionUser] },
                })
                .toArray(),
            db
                .collection<User>("users")
                .find({
                    user: { $in: [...sharedUsers, sessionUser] },
                })
                .toArray(),
        ]);

        for (const group of groups) {
            const items: WithId<TransferItem>[] = [];

            for (const transfer of group.items) {
                push_wallet(wallets, transfer);
                push_user(users, transfer, sessionUser);

                items.push(transfer);
            }

            group.items = items;
        }

        groups = groups.sort((a, b) =>
            dayjs(a.date).unix() > dayjs(b.date).unix() ? -1 : 1
        );

        return {
            statusCode: 200,
            body: JSON.stringify(SortReverse(groups)),
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

const push_wallet = (wallets: WithId<Wallet>[], item: TransferItem) => {
    for (const { _id, name, icon, color } of wallets) {
        for (const key of ["src", "dst"]) {
            if (typeof item[key] !== "undefined") {
                if (item[key].toString() === _id.toString()) {
                    item[key] = { name, icon, color };
                    break;
                }
            }
        }
    }
};

const push_user = (
    users: WithId<User>[],
    item: TransferItem,
    sessionUser: UUID
) => {
    if (typeof item.user === "undefined") {
        return;
    }

    for (const user of users) {
        if (user.user !== sessionUser && user.user === item.user) {
            item.user = user.name;
            break;
        }
    }
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

        const [walletSrc, walletDst] = await Promise.all([
            db
                .collection<Wallet>("wallet")
                .findOne({ _id: src }, { projection: { currency: 1 } }),
            db
                .collection<Wallet>("wallet")
                .findOne({ _id: dst }, { projection: { currency: 1 } }),
        ]);

        if (walletSrc === null || walletDst === null) {
            throw new Error("no wallet data");
        }

        const { currency: currencySrc } = walletSrc;
        const { currency: currencyDst } = walletDst;

        const valueSrc = item.amount.value!;
        let valueDst = valueSrc;

        // if currency exchange
        if (currencySrc !== currencyDst) {
            const exchangeRate = await GetExchangeRate({
                src: currencySrc,
                dst: currencyDst,
            });

            if (typeof exchangeRate === "undefined") {
                throw new Error("no exchange rate");
            }

            valueDst = Math.round(100 * valueSrc * exchangeRate) / 100;

            item.amountDst = {
                currency: currencyDst,
                value: valueDst,
            };
        }

        await Promise.all([
            db
                .collection<Wallet>("wallet")
                .updateOne(
                    { _id: src },
                    { $inc: { value: -valueSrc } },
                    { session }
                ),
            db
                .collection<Wallet>("wallet")
                .updateOne(
                    { _id: dst },
                    { $inc: { value: valueDst } },
                    { session }
                ),
            db.collection<Transfer>("transfer").insertOne(item, { session }),
        ]);

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
