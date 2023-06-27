import { useMemo, useReducer } from "react";
import CurrencySelector, {
    CurrencyType,
} from "../components/currency/selector";
import { CurrencyIcon } from "../components/currency/icon";
import Icon from "@mdi/react";
import {
    mdiArrowDownCircle,
    mdiArrowUpCircle,
    mdiChevronLeft,
    mdiChevronRight,
} from "@mdi/js";
import Amount from "../components/amount";

const currentBalance: Balance[] = [
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

export default function Dashboard() {
    const currencyList = useMemo(() => {
        return currentBalance.map((item) => item.currency);
    }, []);

    const [balance, dispatch] = useReducer(
        (
            state: {
                balance: Balance;
                prev: number;
                next: number;
            },
            action: BalanceAction
        ) => {
            let selected: number = -1;

            for (let i = 0; i < currentBalance.length; i++) {
                if (currentBalance[i].currency === state.balance.currency) {
                    selected = i;
                    break;
                }
            }

            if (selected === -1) {
                return state;
            }

            switch (action.type) {
                case BalanceActionKind.PREV:
                    if (selected === 0) {
                        selected = currentBalance.length - 1;
                    } else {
                        selected--;
                    }
                    break;

                case BalanceActionKind.NEXT:
                    if (selected === currentBalance.length - 1) {
                        selected = 0;
                    } else {
                        selected++;
                    }
                    break;
            }

            const prev =
                selected === 0 ? currentBalance.length - 1 : selected - 1;
            const next =
                selected === currentBalance.length - 1 ? 0 : selected + 1;

            return {
                balance: currentBalance[selected],
                prev,
                next,
            };
        },
        {
            balance: currentBalance[0],
            next: 1,
            prev: 2,
        }
    );

    return (
        <div
            className="text-center border-2 rounded-b-2xl p-2"
            style={{ borderColor: "#0A90D5" }}
        >
            <CurrencySelector
                list={currencyList}
                selected={balance.balance.currency}
            />

            <div className="flex justify-between pt-4">
                <div
                    className="flex gap-1 items-center"
                    onClick={() => {
                        dispatch({ type: BalanceActionKind.PREV });
                    }}
                >
                    <Icon path={mdiChevronLeft} size={1} />
                    <CurrencyIcon
                        type={currentBalance[balance.prev].currency}
                        className="opacity-50"
                    />
                </div>

                <Amount
                    currency={balance.balance.currency}
                    value={balance.balance.value}
                    iconSize={1.2}
                    style={{ fontSize: "22pt", fontWeight: 500 }}
                />

                <div
                    className="flex gap-1 items-center"
                    onClick={() => {
                        dispatch({ type: BalanceActionKind.NEXT });
                    }}
                >
                    <CurrencyIcon
                        type={currentBalance[balance.next].currency}
                        className="opacity-50"
                    />
                    <Icon path={mdiChevronRight} size={1} />
                </div>
            </div>

            <span className="text-sm text-gray-500">Остаток на счетах</span>

            <div className="flex justify-between px-4 pt-6 pb-2">
                <div className="flex gap-1 items-end">
                    <Icon
                        path={mdiArrowDownCircle}
                        size={1.25}
                        color="#67A656"
                    />
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-gray-500">Входящие</span>
                        <Amount
                            currency={balance.balance.currency}
                            value={balance.balance.income}
                            iconSize={0.8}
                            style={{ color: "#67A656", fontSize: "16pt" }}
                        />
                    </div>
                </div>

                <div className="flex gap-1 items-end">
                    <Icon path={mdiArrowUpCircle} size={1.25} color="#E85338" />
                    <div className="flex flex-col justify-center">
                        <span className="text-xs text-gray-500">Исходящие</span>
                        <Amount
                            currency={balance.balance.currency}
                            value={balance.balance.expense}
                            iconSize={0.8}
                            style={{ color: "#E85338", fontSize: "16pt" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

enum BalanceActionKind {
    PREV = "prev",
    NEXT = "next",
}

interface BalanceAction {
    type: BalanceActionKind;
}

interface Balance {
    currency: CurrencyType;
    value: number;
    expense: number;
    income: number;
}
