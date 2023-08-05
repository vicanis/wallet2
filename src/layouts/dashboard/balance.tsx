import { useEffect, useMemo, useReducer } from "react";
import {
    DashboardItem,
    DashboardBalanceAction,
    DashboardBalanceActionKind,
} from ".";
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import CurrencySelector from "../../components/currency/selector";
import { CurrencyIcon } from "../../components/currency/icon";
import Amount from "../../components/amount";

export default function DashboardBalanceLayout({
    items,
    onChangeIndex,
}: {
    items: DashboardItem[];
    onChangeIndex: (index: number) => void;
}) {
    const currencyList = useMemo(() => {
        return items.map((item) => item.currency);
    }, []);

    const [dashboard, dispatch] = useReducer(
        (
            state: {
                current: number;
                previous: number;
                next: number;
            },
            action: DashboardBalanceAction
        ) => {
            let current: number = -1;

            for (let i = 0; i < items.length; i++) {
                if (items[i].currency === items[state.current].currency) {
                    current = i;
                    break;
                }
            }

            if (current === -1) {
                return state;
            }

            switch (action.type) {
                case DashboardBalanceActionKind.PREV:
                    if (current === 0) {
                        current = items.length - 1;
                    } else {
                        current--;
                    }
                    break;

                case DashboardBalanceActionKind.NEXT:
                    if (current === items.length - 1) {
                        current = 0;
                    } else {
                        current++;
                    }
                    break;
            }

            const previous = current === 0 ? items.length - 1 : current - 1;
            const next = current === items.length - 1 ? 0 : current + 1;

            return {
                current,
                previous,
                next,
            };
        },
        {
            current: 0,
            next: Math.min(0, items.length - 1),
            previous: items.length - 1,
        }
    );

    useEffect(() => {
        onChangeIndex(dashboard.current);
    }, [dashboard.current]);

    if (!items.length) {
        return null;
    }

    return (
        <div
            className="text-center text-white pb-4 grid gap-4"
            style={{ backgroundColor: "#0084C8" }}
        >
            <CurrencySelector
                list={currencyList}
                selected={items[dashboard.current].currency}
            />

            <div>
                <div className="flex justify-between px-2">
                    <div
                        className="flex gap-1 items-center"
                        onClick={() => {
                            dispatch({ type: DashboardBalanceActionKind.PREV });
                        }}
                    >
                        <Icon path={mdiChevronLeft} size={1} />
                        <CurrencyIcon
                            type={items[dashboard.previous].currency}
                            className="opacity-50"
                        />
                    </div>

                    <Amount
                        currency={items[dashboard.current].currency}
                        value={items[dashboard.current].value}
                        iconSize={1.4}
                        style={{
                            fontSize: "26pt",
                            fontWeight: 500,
                            lineHeight: "normal",
                        }}
                    />

                    <div
                        className="flex gap-1 items-center"
                        onClick={() => {
                            dispatch({ type: DashboardBalanceActionKind.NEXT });
                        }}
                    >
                        <CurrencyIcon
                            type={items[dashboard.next].currency}
                            className="opacity-50"
                        />
                        <Icon path={mdiChevronRight} size={1} />
                    </div>
                </div>

                <span className="text-sm text-white">Остаток на счетах</span>
            </div>
        </div>
    );
}
