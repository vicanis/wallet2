import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";

export const handler: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 403,
            body: "no body",
        };
    }

    let items: SortItem[];

    try {
        items = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 403,
            body: e.toString(),
        };
    }

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    const session = mongoclient.startSession();

    try {
        session.startTransaction({
            readPreference: "primary",
            readConcern: {
                level: "local",
            },
            writeConcern: {
                w: "majority",
            },
        });

        const db = (await conn).db("wallet2");
        const coll = db.collection("category");

        for (const { _id, order } of items) {
            await coll.updateOne(
                { _id: new ObjectId(_id) },
                { $set: { order } },
                { session }
            );
        }

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

interface SortItem {
    _id: ObjectId;
    order: number;
}
