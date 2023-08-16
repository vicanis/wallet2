import { ObjectId } from "mongodb";
import { Amount } from "./amount";
import { UUID } from "crypto";
import { Wallet } from "./wallet";

export interface Transfer {
    src?: ObjectId;
    dst?: ObjectId;
    amount: Required<Amount>;
    amountDst?: Required<Amount>;
    date: Date;
    comment?: string;
    user?: UUID;
}

export interface TransferItem {
    date: Date;
    src: Pick<Wallet, "name" | "icon" | "color">;
    dst: Pick<Wallet, "name" | "icon" | "color">;
    amount: Required<Amount>;
    amountDst?: Required<Amount>;
    user?: string;
}
