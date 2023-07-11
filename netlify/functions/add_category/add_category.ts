import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Category } from "../../../src/types/category";

export const handler: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 403,
            body: "no body",
        };
    }

    let category: Category;
    let id: ObjectId | undefined;

    try {
        const { _id, ...data } = JSON.parse(event.body) as WithId<Category>;

        if (typeof _id !== "undefined") {
            id = new ObjectId(_id);
        }

        category = data;
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

        if (typeof id === "undefined") {
            await coll.insertOne(category);
        } else {
            await coll.replaceOne({ _id: id }, category);
        }

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
