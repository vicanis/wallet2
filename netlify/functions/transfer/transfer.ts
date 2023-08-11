import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId } from "mongodb";
import { Context } from "@netlify/functions/dist/function/context";
import { Event } from "@netlify/functions/dist/function/event";
import type { Transfer } from "../../../src/types/transfer";
import { ParseUserId } from "../../../src/lib/auth";

export const handler: Handler = async (event, context) => {
    const response = await router(event, context);

    if (!response) {
        console.error("no response");

        return {
            statusCode: 500,
        };
    }

    return response;
};

const router = async (event: Event, context: Context) => {
    switch (event.httpMethod) {
        case "GET":
            return getTransfer(event, context);

        case "POST":
            return createTransfer(event, context);
    }

    return {
        statusCode: 405,
    };
};

const getTransfer: Handler = async (event, context) => {
    return {
        statusCode: 200,
    };
};

const createTransfer: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    const item: Transfer = JSON.parse(event.body);
    const user = ParseUserId(context.clientContext);

    item.user = user;
    item.date = new Date(item.date);
    item.src = new ObjectId(item.src);
    item.dst = new ObjectId(item.dst);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");
    const coll = db.collection<Transfer>("transfer");

    try {
        await coll.insertOne(item);
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }

    return {
        statusCode: 200,
    };
};

//
