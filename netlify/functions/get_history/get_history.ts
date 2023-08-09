import { Handler } from "@netlify/functions";
import { MongoClient, WithId } from "mongodb";
import type { Category } from "../../../src/types/category";
import type { Wallet } from "../../../src/types/wallet";
import type { HistoryGroup } from "../../../src/types/history";
import dayjs from "../../../src/lib/dayjs";
import { ParseUserId } from "../../../src/lib/auth";
import GetSharedUsers from "../../../src/lib/user";

export const handler: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const user = ParseUserId(context.clientContext);
        const sharedUsers = await GetSharedUsers(user);

        const db = (await conn).db("wallet2");

        const boundaries: Date[] = [];

        for (let i = 12; i >= -2; i--) {
            boundaries.push(dayjs().startOf("day").subtract(i, "day").toDate());
        }

        const [groups, categories, wallets] = await Promise.all([
            db
                .collection("operation")
                .aggregate<HistoryGroup>([
                    {
                        $match: {
                            user: {
                                $in: [...sharedUsers, user],
                            },
                        },
                    },
                    {
                        $sort: {
                            date: -1,
                        },
                    },
                    {
                        $limit: 100,
                    },
                    {
                        $bucket: {
                            groupBy: "$date",
                            boundaries,
                            default: "other",
                            output: {
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
                            date: "$_id",
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
                        item.category = category;
                        break;
                    }
                }

                for (const wallet of wallets) {
                    if (item.wallet.toString() === wallet._id.toString()) {
                        item.wallet = wallet;
                        break;
                    }
                }
            }
        }

        // sort list in reverse order
        for (let i = 0; i < groups.length / 2; i++) {
            const temp = groups[i];
            groups[i] = groups[groups.length - i - 1];
            groups[groups.length - i - 1] = temp;
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
