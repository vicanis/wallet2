import { useState } from "react";
import { CurrencyType } from "../../types/currency";
import DashboardBalanceLayout from "./balance";
import DashboardSummaryLayout from "./summary";

export default function DashboardLayout() {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <DashboardBalanceLayout
                items={currentBalance}
                onChangeIndex={setIndex}
            />
            <DashboardSummaryLayout balance={currentBalance[index]} />
        </div>
    );
}

export enum DashboardBalanceActionKind {
    PREV = "prev",
    NEXT = "next",
}

export interface DashboardBalanceAction {
    type: DashboardBalanceActionKind;
}

export interface DashboardItem {
    currency: CurrencyType;
    value: number;
}

export interface DashboardBalance {
    currency: CurrencyType;
    expense: number;
    income: number;
}

const currentBalance: (DashboardItem & DashboardBalance)[] = [
    {
        currency: "RUB",
        value: 100000,
        expense: 20000,
        income: 80000,
    },
    {
        currency: "USD",
        value: 8500,
        expense: 1500,
        income: 10000,
    },
    {
        currency: "KZT",
        value: 800000,
        expense: 400000,
        income: 1200000,
    },
];
