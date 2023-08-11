import { ObjectId } from "mongodb";
import { Amount } from "./amount";
import { UUID } from "crypto";

export interface Transfer {
    src?: ObjectId;
    dst?: ObjectId;
    amount: Amount;
    date: Date;
    comment?: string;
    user?: UUID;
}
