import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Category } from "../../../src/types/category";
import withAuth from "../../../src/hooks/auth";
import { ParseUserId } from "../../../src/lib/auth";

export const handler: Handler = withAuth(async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    let category: Category;
    let id: ObjectId | undefined;

    try {
        const { _id, ...data } = JSON.parse(event.body) as WithId<Category>;
        if (typeof _id === "string" && _id !== "new") {
            id = new ObjectId(_id);
        }

        category = data;
    } catch (e) {
        console.error("category parse failed", e);

        return {
            statusCode: 400,
            body: e.toString(),
        };
    }

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    try {
        const user = ParseUserId(context.clientContext);

        const db = (await conn).db("wallet2");
        const coll = db.collection("category");

        if (typeof category.order === "undefined") {
            category.order = await coll.countDocuments({
                type: category.type,
                user,
            });
        }

        if (typeof id === "undefined") {
            await coll.insertOne({
                ...category,
                user,
            });
        } else {
            await coll.replaceOne({ _id: id, user }, category);
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
});
