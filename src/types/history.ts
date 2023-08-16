import { ObjectId } from "mongodb";
import { Category } from "./category";
import { Wallet } from "./wallet";
import { Amount } from "./amount";

export interface HistoryGroup {
    count: number;
    date: Date;
    items: HistoryItem[];
}

export interface HistoryItem {
    id: ObjectId;
    date: Date;
    amount: Required<Amount>;
    wallet: Wallet;
    category: Category;
    user?: string;
}
