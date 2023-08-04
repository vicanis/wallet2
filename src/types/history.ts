import { Category } from "./category";
import { CurrencyType } from "./currency";
import { Wallet } from "./wallet";

export interface HistoryGroup {
    count: number;
    date: Date;
    items: HistoryItem[];
}

export interface HistoryItem {
    date: Date;
    amount: {
        currency: CurrencyType;
        value: number;
    };
    wallet: Wallet;
    category: Category;
}
