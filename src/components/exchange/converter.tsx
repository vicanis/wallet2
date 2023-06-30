import Icon from "@mdi/react";
import Amount from "../amount";
import CurrencyFlag from "../currency/flag";
import { CurrencyType } from "../currency/selector";
import { mdiSwapVertical } from "@mdi/js";

export default function Converter() {
    return (
        <div
            className="rounded-xl py-4 grid gap-4 text-white"
            style={{
                backgroundColor: "#0A90D5",
            }}
        >
            <Line currency="RUB" value={1000} />
            <div className="text-center relative">
                <div className="absolute left-10">
                    <Icon path={mdiSwapVertical} size={1} />
                </div>
                <Rate from="RUB" to="USD" />
            </div>
            <Line currency="USD" value={1.25} />
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

function Rate({ from, to }: { from: CurrencyType; to: CurrencyType }) {
    return (
        <span>
            1 {to} = 80 {from}
        </span>
    );
}
