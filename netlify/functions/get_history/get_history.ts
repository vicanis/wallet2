import { Handler } from "@netlify/functions";
import { MongoClient, WithId } from "mongodb";
import type { Operation } from "../../../src/types/operation";
import type { Category } from "../../../src/types/category";
import type { Wallet } from "../../../src/types/wallet";
import type { HistoryGroup, HistoryItem } from "../../../src/types/history";
import dayjs from "../../../src/lib/dayjs";
import { ParseUserId } from "../../../src/lib/auth";
import withAuth from "../../../src/hooks/auth";
import GetSharedUsers from "../../../src/lib/user";
import { User } from "../../../src/types/user";

export const handler: Handler = withAuth(async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const sessionUser = ParseUserId(context.clientContext);
        const sharedUsers = await GetSharedUsers(sessionUser);

        const db = (await conn).db("wallet2");

        const boundaries: Date[] = [];

        for (let i = 12; i >= -2; i--) {
            boundaries.push(dayjs().startOf("day").subtract(i, "day").toDate());
        }

        const [groups, categories, wallets, users] = await Promise.all([
            db
                .collection<Operation>("operation")
                .aggregate<HistoryGroup>([
                    {
                        $match: {
                            user: {
                                $in: [...sharedUsers, sessionUser],
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
                                        id: "$_id",
                                        date: "$date",
                                        amount: "$amount",
                                        wallet: "$wallet",
                                        category: "$category",
                                        user: "$user",
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
            db.collection<WithId<User>>("users").find().toArray(),
        ]);

        const push_users = (item: HistoryItem) => {
            if (item.user === sessionUser) {
                delete item.user;
                return item;
            }

            for (const user of users) {
                if (item.user === user.user) {
                    item.user = user.name;
                    break;
                }
            }
        };

        const push_categories = (item: HistoryItem) => {
            for (const category of categories) {
                if (item.category.toString() === category._id.toString()) {
                    item.category = category;
                    break;
                }
            }
        };

        const push_wallets = (item: HistoryItem) => {
            for (const wallet of wallets) {
                if (item.wallet.toString() === wallet._id.toString()) {
                    item.wallet = wallet;
                    break;
                }
            }
        };

        for (const group of groups) {
            for (let item of group.items) {
                push_users(item);
                push_categories(item);
                push_wallets(item);
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
});
