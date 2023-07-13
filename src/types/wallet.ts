import { CurrencyType } from "../components/currency/selector";

export interface Wallet {
    name: string;
    currency: CurrencyType;
    icon: string;
    color?: string;
    value: number;
    outcast?: boolean;
}
