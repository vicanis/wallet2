import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { Wallet, WalletSettingsItem } from "../../../src/types/wallet";
import { AuthError, ParseUserId } from "../../../src/lib/auth";
import GetSharedUsers from "../../../src/lib/user";

export const handler: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const user = ParseUserId(context.clientContext);
        const sharedUsers = await GetSharedUsers(user);

        const db = (await conn).db("wallet2");
        const coll = db.collection<Wallet & { own?: boolean }>("wallet");

        const list = coll.find(
            {
                user: {
                    $in: [...sharedUsers, user],
                },
            },
            {
                sort: {
                    order: 1,
                    name: 1,
                },
                projection: {
                    outcast: 0,
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

        const data: WalletSettingsItem[] = [];

        itemloop: for (const item of items) {
            if (!item.own) {
                continue;
            }

            delete item.own;

            for (const wallet of data) {
                if (wallet.currency === item.currency) {
                    wallet.wallets.push(item);
                    continue itemloop;
                }
            }

            data.push({
                currency: item.currency,
                wallets: [item],
            });
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (e) {
        if (e instanceof AuthError) {
            return {
                statusCode: 302,
                headers: {
                    Location: "/login",
                },
            };
        }

        console.error(e.toString());

        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }
};
