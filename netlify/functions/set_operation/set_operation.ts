import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Operation } from "../../../src/types/operation";
import { ParseUserId, WithUser } from "../../../src/lib/auth";

export const handler: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    let operation: WithUser<Operation>;
    let id: ObjectId | undefined;

    try {
        const { _id, ...data } = JSON.parse(event.body) as WithUser<
            WithId<Operation>
        >;

        if (typeof _id === "string" && _id !== "new") {
            id = new ObjectId(_id);
        }

        operation = data;
    } catch (e) {
        console.error("operation parse failed", e);

        return {
            statusCode: 400,
            body: e.toString(),
        };
    }

    for (const field of ["wallet", "category"]) {
        if (typeof operation[field] === "string") {
            operation[field] = new ObjectId(operation[field]);
        }
    }

    if (typeof operation.date === "string") {
        operation.date = new Date(operation.date);
    }

    const user = ParseUserId(context.clientContext);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection("operation");

        if (typeof id === "undefined") {
            await coll.insertOne({
                ...operation,
                user,
            });
        } else {
            await coll.replaceOne({ _id: id, user }, operation);
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
