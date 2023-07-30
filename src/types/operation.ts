import { ObjectId } from "mongodb";
import { CurrencyType } from "./currency";

export interface Operation {
    type: "expense" | "income";
    date: Date;
    amount: {
        value?: number;
        currency: CurrencyType;
    };
    comment?: string;
    category?: ObjectId;
    wallet?: ObjectId;
}
