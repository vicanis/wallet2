import { Handler } from "@netlify/functions";
import { MongoClient, ObjectId, WithId } from "mongodb";
import type { Operation } from "../../../src/types/operation";
import type { Wallet } from "../../../src/types/wallet";
import withAuth from "../../../src/hooks/auth";
import { ParseUserId } from "../../../src/lib/auth";
import { DefaultTransactionOptions } from "../../../src/lib/transaction";
import { UUID } from "crypto";

export const handler: Handler = withAuth(async (event, context) => {
    if (event.body === null) {
        return {
            statusCode: 400,
            body: "no body",
        };
    }

    let operation: Operation;
    let id: ObjectId | undefined;

    let createNew = true;

    try {
        const { _id, ...data } = JSON.parse(event.body) as WithId<Operation>;

        if (typeof _id === "string" && _id !== "new") {
            id = new ObjectId(_id);
            createNew = false;
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

    try {
        if (createNew) {
            await createOperation({
                operation,
                user,
            });
        } else {
            await updateOperation({
                operation: { _id: id!, ...operation },
                user,
            });
        }

        return {
            statusCode: 200,
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
});

async function createOperation({
    operation,
    user,
}: {
    operation: Operation;
    user: UUID;
}) {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    const session = mongoclient.startSession();

    try {
        const db = (await conn).db("wallet2");

        session.startTransaction(DefaultTransactionOptions);

        await db
            .collection<Operation>("operation")
            .insertOne({ ...operation, user }, { session });

        const value =
            operation.amount.value! * (operation.type === "expense" ? -1 : 1);

        await db
            .collection<Wallet>("wallet")
            .updateOne(
                { _id: operation.wallet },
                { $inc: { value } },
                { session }
            );

        await session.commitTransaction();
    } catch (e) {
        await session.abortTransaction();
        throw e;
    } finally {
        mongoclient.close();
    }
}

async function updateOperation({
    operation,
    user,
}: {
    operation: WithId<Operation>;
    user: UUID;
}) {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    const session = mongoclient.startSession();

    try {
        const db = (await conn).db("wallet2");

        session.startTransaction(DefaultTransactionOptions);

        const { _id: id } = operation;

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

        await session.commitTransaction();
    } catch (e) {
        await session.abortTransaction();
        throw e;
    } finally {
        mongoclient.close();
    }
}
