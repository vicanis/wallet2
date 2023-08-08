import { Handler } from "@netlify/functions";
import { MongoClient } from "mongodb";
import crypto from "crypto";
import { ParseUserId } from "../../../src/lib/auth";
import type { Invitation } from "../../../src/types/invitation";

export const handler: Handler = async (event, context) => {
    const author = ParseUserId(context.clientContext);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);
    const conn = mongoclient.connect();

    const db = (await conn).db("wallet2");
    const coll = db.collection<Invitation>("invitation");

    switch (event.httpMethod) {
        case "GET":
            try {
                const item = await coll.findOne();

                return {
                    statusCode: 200,
                    body: JSON.stringify(item),
                };
            } catch (e) {
                return {
                    statusCode: 500,
                    body: e.toString,
                };
            } finally {
                mongoclient.close();
            }
            break;

        case "POST":
            try {
                const invitation: Invitation = {
                    author,
                    token: crypto.randomUUID(),
                    created: new Date(),
                    users: [],
                };

                await coll.insertOne(invitation);

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
            break;

        case "DELETE":
            try {
                const item = await coll.findOne();

                if (item === null) {
                    return {
                        statusCode: 404,
                    };
                }

                const { _id } = item;

                console.log("found item", _id.toString());

                await coll.deleteOne({ _id });

                console.log("deleted");

                return {
                    statusCode: 200,
                };
            } catch (e) {
                return {
                    statusCode: 500,
                    body: e.toString,
                };
            } finally {
                mongoclient.close();
            }
            break;
    }

    return {
        statusCode: 405,
    };
};
