import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Wallet } from "../../../src/types/wallet";

export const handler: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    let wallet: Wallet;
    let id: ObjectId | undefined;

    try {
        const { _id, ...data } = JSON.parse(event.body) as WithId<Wallet>;

        if (typeof _id === "string" && _id !== "new") {
            id = new ObjectId(_id);
        }

        wallet = data;
    } catch (e) {
        console.error("wallet parse failed", e);

        return {
            statusCode: 400,
            body: e.toString(),
        };
    }

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection("wallet");

        if (typeof wallet.order === "undefined") {
            wallet.order = await coll.countDocuments();
        }

        if (typeof id === "undefined") {
            await coll.insertOne(wallet);
        } else {
            await coll.replaceOne({ _id: id }, wallet);
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
