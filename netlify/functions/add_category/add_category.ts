import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import type { Category } from "../../../src/types/category";

export const handler: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 403,
            body: "no body",
        };
    }

    let category: Category;

    try {
        category = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 403,
            body: e.toString(),
        };
    }

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection("category");

        const { insertedId: id } = await coll.insertOne(category);

        return {
            statusCode: 200,
            body: JSON.stringify({ id }),
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
