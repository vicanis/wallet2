import { CurrencyType } from "../components/currency/selector";

export interface Category {
    type: "expense" | "income";
    name: string;
    icon?: string;
    color?: string;
    plan: {
        value?: number;
        currency?: CurrencyType;
    };
    order?: number;
}
