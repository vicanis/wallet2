import type { UUID } from "crypto";
import type { CurrencyType } from "./currency";

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
    other?: true;
    user?: UUID;
}
