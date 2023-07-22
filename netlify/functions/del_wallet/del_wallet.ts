import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";

export const handler: Handler = async (event, context) => {
    if (event.queryStringParameters === null) {
        return {
            statusCode: 403,
            body: "no query",
        };
    }

    const { id } = event.queryStringParameters;

    if (id === null) {
        return {
            statusCode: 403,
            body: "no id",
        };
    }

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection("wallet");

        await coll.deleteOne({
            _id: new ObjectId(id),
        });

        return {
            statusCode: 200,
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
