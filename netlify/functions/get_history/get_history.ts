import { Handler } from "@netlify/functions";
import { MongoClient, WithId } from "mongodb";
import type { Operation } from "../../../src/types/operation";
import type { Category } from "../../../src/types/category";
import type { Wallet } from "../../../src/types/wallet";
import type { HistoryGroup, HistoryItem } from "../../../src/types/history";
import { ParseUserId } from "../../../src/lib/auth";
import withAuth from "../../../src/hooks/auth";
import GetSharedUsers from "../../../src/lib/user";
import { User } from "../../../src/types/user";
import GenerateDateBoundaries from "../../../src/lib/boundaries";
import SortReverse from "../../../src/lib/reverse";
import { UUID } from "crypto";

export const handler: Handler = withAuth(async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const sessionUser = ParseUserId(context.clientContext);
        const sharedUsers = await GetSharedUsers(sessionUser);

        const db = (await conn).db("wallet2");

        const boundaries = GenerateDateBoundaries();

        const [groups, categories, wallets, users] = await Promise.all([
            db
                .collection<Operation>("operation")
                .aggregate<HistoryGroup>([
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
                    { $set: { date: "$_id" } },
                    { $unset: "_id" },
                ])
                .toArray(),
            db.collection<WithId<Category>>("category").find().toArray(),
            db.collection<WithId<Wallet>>("wallet").find().toArray(),
            db.collection<WithId<User>>("users").find().toArray(),
        ]);

        for (const group of groups) {
            for (let item of group.items) {
                push_users(users, item, sessionUser);
                push_categories(categories, item);
                push_wallets(wallets, item);
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(SortReverse(groups)),
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

const push_users = (
    users: WithId<User>[],
    item: HistoryItem,
    sessionUser: UUID
) => {
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

const push_categories = (categories: WithId<Category>[], item: HistoryItem) => {
    for (const category of categories) {
        if (item.category.toString() === category._id.toString()) {
            item.category = category;
            break;
        }
    }
};

const push_wallets = (wallets: WithId<Wallet>[], item: HistoryItem) => {
    for (const wallet of wallets) {
        if (item.wallet.toString() === wallet._id.toString()) {
            item.wallet = wallet;
            break;
        }
    }
};
