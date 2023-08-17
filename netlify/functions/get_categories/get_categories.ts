import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import type { Category } from "../../../src/types/category";
import withAuth from "../../../src/hooks/auth";
import { ParseUserId } from "../../../src/lib/auth";
import GetSharedUsers from "../../../src/lib/user";

export const handler: Handler = withAuth(async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const user = ParseUserId(context.clientContext);
        const sharedUsers = await GetSharedUsers(user);

        const db = (await conn).db("wallet2");
        const coll = db.collection<Category & { own?: boolean }>("category");

        const list = coll.find(
            {
                $or: [
                    {
                        user: {
                            $in: [...sharedUsers, user],
                        },
                    },
                    { other: true },
                ],
            },
            {
                sort: {
                    order: 1,
                    name: 1,
                },
            }
        );

        const items = await list.toArray();

        for (const item of items) {
            item.own = item.user === user;
        }

        if (event.queryStringParameters !== null) {
            const { mode } = event.queryStringParameters;

            if (mode === "plain") {
                return {
                    statusCode: 200,
                    body: JSON.stringify(items),
                };
            }
        }

        const data: Category[] = [];

        for (const item of items) {
            if (!item.own) {
                continue;
            }

            delete item.own;

            data.push(item);
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
});
