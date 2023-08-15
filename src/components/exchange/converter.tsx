import Icon from "@mdi/react";
import Amount from "../amount";
import CurrencyFlag from "../currency/flag";
import { CurrencyType } from "../../types/currency";
import { mdiSwapVertical } from "@mdi/js";
import RoundedAmount, { RoundValue } from "../rounded";

export default function Converter({
    value,
    from,
    to,
    rate,
    onChangeCurrency,
}: {
    value: number;
    from: CurrencyType;
    to: CurrencyType;
    rate: number;
    onChangeCurrency: (from: CurrencyType, to: CurrencyType) => void;
}) {
    return (
        <div
            className="rounded-xl py-4 grid gap-4 text-white"
            style={{
                backgroundColor: "#0A90D5",
            }}
        >
            <Line currency={from} value={value} />

            <div className="text-center relative">
                <div
                    className="absolute left-10"
                    onClick={() => {
                        onChangeCurrency(to, from);
                    }}
                >
                    <Icon path={mdiSwapVertical} size={1} />
                </div>
                <Rate from={from} to={to} rate={rate} />
            </div>

            <Line
                currency={to}
                value={RoundValue({
                    value: rate * value,
                    strict: true,
                })}
            />
        </div>
    );
}

function Line({ currency, value }: { currency: CurrencyType; value: number }) {
    return (
        <div className="px-6 h-10 flex gap-4 items-center justify-between">
            <CurrencyFlag currency={currency} />
            <span className="uppercase flex-grow">{currency}</span>
            <Amount currency={currency} value={value} iconSize={0.7} />
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
            1 {to} = <RoundedAmount value={rate} /> {from}
        </span>
    );
}
