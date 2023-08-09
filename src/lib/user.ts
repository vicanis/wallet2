import { UUID } from "crypto";
import { MongoClient } from "mongodb";
import { Invitation } from "../types/invitation";

export default async function GetSharedUsers(user: UUID): Promise<UUID[]> {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");

        const inv = await db.collection<Invitation>("invitation").findOne({
            $or: [{ author: user }, { users: user }],
        });

        if (inv !== null) {
            return [inv.author, ...inv.users];
        }
    } catch (e) {
        console.error(e);
    } finally {
        mongoclient.close();
    }

    return [];
}
