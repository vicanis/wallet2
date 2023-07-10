import { CurrencyType } from "../components/currency/selector";

export interface Category {
    name: string;
    icon?: string;
    color: string;
    plan: {
        value?: number;
        currency?: CurrencyType;
    };
}
