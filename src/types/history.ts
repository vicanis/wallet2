import { ObjectId } from "mongodb";
import { Category } from "./category";
import { CurrencyType } from "./currency";
import { Wallet } from "./wallet";

export interface HistoryGroup {
    count: number;
    date: Date;
    items: HistoryItem[];
}

export interface HistoryItem {
    id: ObjectId;
    date: Date;
    amount: {
        currency: CurrencyType;
        value: number;
    };
    wallet: Wallet;
    category: Category;
    user?: string;
}
