import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Wallet } from "../../../src/types/wallet";
import withAuth from "../../../src/hooks/auth";
import { ParseUserId } from "../../../src/lib/auth";

export const handler: Handler = withAuth(async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    const user = ParseUserId(context.clientContext);

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
            wallet.order = await coll.countDocuments({ user });
        }

        if (typeof id === "undefined") {
            await coll.insertOne({
                ...wallet,
                user,
            });
        } else {
            await coll.replaceOne({ _id: id, user }, wallet);
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
