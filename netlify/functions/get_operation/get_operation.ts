import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";

export const handler: Handler = async (event, context) => {
    if (event.queryStringParameters === null) {
        return {
            statusCode: 400,
            body: "no query",
        };
    }

    const { id } = event.queryStringParameters;

    if (!id) {
        return {
            statusCode: 400,
            body: "no id",
        };
    }

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection("operation");

        const item = await coll.findOne({
            _id: new ObjectId(id),
        });

        return {
            statusCode: 200,
            body: JSON.stringify(item),
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
