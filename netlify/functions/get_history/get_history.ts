import { Handler } from "@netlify/functions";
import { MongoClient, WithId } from "mongodb";
import type { Category } from "../../../src/types/category";
import type { Wallet } from "../../../src/types/wallet";
import dayjs from "../../../src/lib/dayjs";

export const handler: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");

        const boundaries: Date[] = [];

        for (let i = 12; i >= -2; i--) {
            boundaries.push(dayjs().startOf("day").subtract(i, "day").toDate());
        }

        const [groups, categories, wallets] = await Promise.all([
            db
                .collection("operation")
                .aggregate<{
                    count: number;
                    items: {
                        date: Date;
                        amount: {
                            currency: string;
                            value: number;
                        };
                        wallet: string;
                        category: string;
                    }[];
                }>([
                    {
                        $sort: {
                            date: -1,
                        },
                    },
                    {
                        $bucket: {
                            groupBy: "$date",
                            boundaries,
                            default: "other",
                            output: {
                                count: {
                                    $sum: 1,
                                },
                                items: {
                                    $push: {
                                        date: "$date",
                                        amount: "$amount",
                                        wallet: "$wallet",
                                        category: "$category",
                                    },
                                },
                            },
                        },
                    },
                    {
                        $set: {
                            day: "$_id",
                        },
                    },
                    {
                        $unset: "_id",
                    },
                ])
                .toArray(),
            db.collection<WithId<Category>>("category").find().toArray(),
            db.collection<WithId<Wallet>>("wallet").find().toArray(),
        ]);

        for (const group of groups) {
            for (const item of group.items) {
                for (const category of categories) {
                    if (item.category.toString() === category._id.toString()) {
                        item.category = category.name;
                        break;
                    }
                }

                for (const wallet of wallets) {
                    if (item.wallet.toString() === wallet._id.toString()) {
                        item.wallet = wallet.name;
                        break;
                    }
                }
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(groups),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
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
