import { ObjectId } from "mongodb";
import { CurrencyType } from "../components/currency/selector";

export interface Operation {
    type: "expense" | "income";
    date: string;
    amount: {
        value: number;
        currency: CurrencyType;
    };
    comment?: string;
    category?: ObjectId;
}
