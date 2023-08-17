import { useEffect, useState } from "react";
import fetcher from "../lib/fetcher";
import Icon from "@mdi/react";
import { mdiCalculatorVariant } from "@mdi/js";
import { Operation } from "../types/operation";
import CurrencySelector from "./currency/selector";
import type { CurrencyList } from "../types/currency";
import Blur from "./blur";
import LoadingLayout from "../layouts/loading";
import { CurrencyContext } from "../context/currency";

export default function AmountEditor({
    amount,
    onChange,
    noBorder,
}: Pick<Operation, "amount"> & {
    onChange: (amount: Operation["amount"]) => void;
    noBorder?: boolean;
}) {
    const [currency, setCurrency] = useState<CurrencyList>();

    useEffect(() => {
        fetcher("exchange")
            .then((resp) => resp.json())
            .then((data) => {
                setCurrency(data.currency);
            });
    }, []);

    if (typeof currency === "undefined") {
        return (
            <Blur>
                <LoadingLayout>Загрузка данных ...</LoadingLayout>
            </Blur>
        );
    }

    return (
        <CurrencyContext.Provider value={currency}>
            <div className="flex gap-5 items-center">
                <div>
                    <CurrencySelector
                        {...amount}
                        onChange={(currency) => {
                            onChange({
                                ...amount,
                                currency,
                            });
                        }}
                        mini
                    />
                </div>
                <input
                    type="input"
                    placeholder="Введите сумму"
                    className={`w-full mr-10 p-1 ${
                        !noBorder ? "border-b-[1px] border-b-[#0084C8]" : ""
                    }`}
                    defaultValue={amount.value}
                    onChange={(event) => {
                        const value = event.target.value;

                        if (value === null || typeof value === "undefined") {
                            return;
                        }

                        onChange({
                            ...amount,
                            value: Number(value),
                        });
                    }}
                />
                <div className="flex items-center">
                    <Icon
                        path={mdiCalculatorVariant}
                        size={1.5}
                        color="#0A90D5"
                        style={{
                            position: "absolute",
                            right: "2em",
                        }}
                    />
                </div>
            </div>
        </CurrencyContext.Provider>
    );
}
