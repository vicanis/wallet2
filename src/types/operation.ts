import { ObjectId } from "mongodb";
import { Amount } from "./amount";
import { UUID } from "crypto";

export interface Operation {
    type: "expense" | "income";
    date: Date;
    amount: Amount;
    comment?: string;
    category?: ObjectId;
    wallet?: ObjectId;
    user?: UUID;
}
