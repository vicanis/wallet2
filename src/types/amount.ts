import { CurrencyType } from "./currency";

export interface Amount {
    value?: number;
    currency: CurrencyType;
}
