import { WithId } from "mongodb";
import { CurrencyType } from "./currency";

export interface Wallet {
    name: string;
    currency: CurrencyType;
    icon: string;
    color?: string;
    value: number;
    outcast?: boolean;
    order?: number;
}

export interface WalletSettingsItem {
    currency: CurrencyType;
    wallets: WithId<Wallet>[];
}
