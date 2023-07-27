import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { Wallet, WalletSettingsItem } from "../../../src/types/wallet";

export const handler: Handler = async (event, context) => {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection<Wallet>("wallet");

        const list = coll.find(
            {},
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

        if (event.queryStringParameters !== null) {
            const { mode } = event.queryStringParameters;

            switch (mode) {
                case "plain":
                    return {
                        statusCode: 200,
                        body: JSON.stringify(items),
                    };
            }
        }

        const data: WalletSettingsItem[] = [];

        itemloop: for (const item of items) {
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
        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }
};
