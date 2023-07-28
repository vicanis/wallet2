import Icon from "@mdi/react";
import { mdiCalculatorVariant } from "@mdi/js";
import { Operation } from "../types/operation";
import CurrencyMiniSelector from "./currency/miniselector";

export default function AmountEditor({
    amount,
    onChange,
}: Pick<Operation, "amount"> & {
    onChange: (amount: Operation["amount"]) => void;
}) {
    return (
        <div className="flex gap-5 items-center">
            <div className="">
                <CurrencyMiniSelector
                    currency={amount.currency}
                    onChange={(currency) => {
                        onChange({
                            ...amount,
                            currency,
                        });
                    }}
                />
            </div>
            <input
                type="input"
                placeholder="Введите сумму"
                className="w-full mr-10 p-2"
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
    );
}
