import { WithId } from "mongodb";
import type { CurrencyType } from "./currency";
import type { UUID } from "crypto";

export interface Wallet {
    name: string;
    currency: CurrencyType;
    icon: string;
    color?: string;
    value: number;
    outcast?: boolean;
    order?: number;
    user: UUID;
}

export interface WalletSettingsItem {
    currency: CurrencyType;
    wallets: WithId<Wallet>[];
}
