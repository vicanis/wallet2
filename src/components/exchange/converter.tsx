import Icon from "@mdi/react";
import { mdiSwapVertical } from "@mdi/js";
import { CurrencyType } from "../../types/currency";
import RoundedAmount, { RoundValue } from "../rounded";
import CurrencySelector from "../currency/selector";

export default function Converter({
    value,
    from,
    to,
    rate,
    onChangeCurrency,
}: {
    value: number;
    from?: CurrencyType;
    to?: CurrencyType;
    rate: number;
    onChangeCurrency: (arg: { from?: CurrencyType; to?: CurrencyType }) => void;
}) {
    return (
        <div
            className="rounded-xl py-4 grid gap-4 text-white"
            style={{
                backgroundColor: "#0A90D5",
            }}
        >
            <CurrencySelector
                currency={from}
                value={value}
                onChange={(code) => {
                    onChangeCurrency({
                        from: code,
                        to: code === to ? undefined : to,
                    });
                }}
            />

            <div className="text-center relative">
                <div
                    className="absolute left-10"
                    onClick={() => {
                        onChangeCurrency({ from: to, to: from });
                    }}
                >
                    <Icon path={mdiSwapVertical} size={1} />
                </div>
                {typeof from !== "undefined" && typeof to !== "undefined" && (
                    <Rate from={from} to={to} rate={rate} />
                )}
            </div>

            <CurrencySelector
                currency={to}
                value={RoundValue({
                    value: rate * value,
                    strict: true,
                })}
                onChange={(code) => {
                    onChangeCurrency({
                        from: code === from ? undefined : from,
                        to: code,
                    });
                }}
            />
        </div>
    );
}

function Rate({
    from,
    to,
    rate,
}: {
    from: CurrencyType;
    to: CurrencyType;
    rate: number;
}) {
    return (
        <span>
            1 {from} = <RoundedAmount value={rate} /> {to}
        </span>
    );
}
