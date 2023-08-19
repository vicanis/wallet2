import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { Wallet, WalletSettingsItem } from "../../../src/types/wallet";
import { ParseUserId } from "../../../src/lib/auth";
import withAuth from "../../../src/hooks/auth";
import GetSharedUsers from "../../../src/lib/user";

export const handler: Handler = withAuth(async (event, context) => {
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

        for (const item of items) {
            if (!item.own) {
                continue;
            }

            delete item.own;

            let next = false;
            for (const wallet of data) {
                if (wallet.currency === item.currency) {
                    wallet.wallets.push(item);
                    next = true;
                    break;
                }
            }

            if (next) {
                continue;
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
    } finally {
        mongoclient.close();
    }
});
