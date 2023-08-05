import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import { ParseUserId } from "../../../src/lib/auth";

export const handler: Handler = async (event, context) => {
    const user = ParseUserId(context.clientContext);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection("category");

        const list = coll.find(
            { user },
            {
                sort: {
                    order: 1,
                    name: 1,
                },
            }
        );

        const items = await list.toArray();

        return {
            statusCode: 200,
            body: JSON.stringify(items),
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
