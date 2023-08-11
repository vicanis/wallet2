import { ObjectId } from "mongodb";
import { Amount } from "./amount";

export interface Operation {
    type: "expense" | "income";
    date: Date;
    amount: Amount;
    comment?: string;
    category?: ObjectId;
    wallet?: ObjectId;
}
