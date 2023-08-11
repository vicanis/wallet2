import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Operation } from "../../../src/types/operation";
import type { Wallet } from "../../../src/types/wallet";
import { ParseUserId } from "../../../src/lib/auth";
import { DefaultTransactionOptions } from "../../../src/lib/transaction";

export const handler: Handler = async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    let operation: Operation;
    let id: ObjectId | undefined;

    try {
        const { _id, ...data } = JSON.parse(event.body) as WithId<Operation>;

        if (typeof _id === "string" && _id !== "new") {
            id = new ObjectId(_id);
        }

        data.date = new Date(data.date);

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

    const user = ParseUserId(context.clientContext);

    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    const session = mongoclient.startSession();

    try {
        const db = (await conn).db("wallet2");

        session.startTransaction(DefaultTransactionOptions);

        if (typeof id === "undefined") {
            await db.collection<Operation>("operation").insertOne(
                {
                    ...operation,
                    user,
                },
                { session }
            );

            const value =
                operation.amount.value! *
                (operation.type === "expense" ? -1 : 1);

            await db
                .collection<Wallet>("wallet")
                .updateOne(
                    { _id: operation.wallet },
                    { $inc: { value } },
                    { session }
                );
        } else {
            await db
                .collection<Operation>("operation")
                .replaceOne({ _id: id, user }, operation, { session });

            const prevOperation = await db
                .collection<Operation>("operation")
                .findOne({
                    _id: id,
                });

            if (prevOperation === null) {
                throw new Error("operation data was not found");
            }

            const valueOld = prevOperation.amount.value!;
            const valueNew = operation.amount.value!;

            const value =
                valueOld * (prevOperation.type === "expense" ? 1 : -1) +
                valueNew * (operation.type === "expense" ? -1 : 1);

            await db
                .collection<Wallet>("wallet")
                .updateOne(
                    { _id: operation.wallet },
                    { $inc: { value } },
                    { session }
                );
        }

        await session.commitTransaction();

        return {
            statusCode: 200,
        };
    } catch (e) {
        await session.abortTransaction();

        return {
            statusCode: 500,
            body: e.toString(),
        };
    } finally {
        mongoclient.close();
    }
};
