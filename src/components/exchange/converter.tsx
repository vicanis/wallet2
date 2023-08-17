import { useContext, useMemo } from "react";
import Icon from "@mdi/react";
import { mdiSwapVertical } from "@mdi/js";
import { CurrencyType } from "../../types/currency";
import Amount from "../amount";
import CurrencyFlag from "../currency/flag";
import RoundedAmount, { RoundValue } from "../rounded";
import BlurredSelector from "../blurredselector";
import { ObjectId } from "mongodb";
import { CurrencyContext } from "../../context/currency";

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
    onChangeCurrency: (from?: CurrencyType, to?: CurrencyType) => void;
}) {
    return (
        <div
            className="rounded-xl py-4 grid gap-4 text-white"
            style={{
                backgroundColor: "#0A90D5",
            }}
        >
            <CurrencyBlock
                currency={from}
                value={value}
                onChange={(code) => {
                    onChangeCurrency(code, code === to ? undefined : to);
                }}
            />

            <div className="text-center relative">
                <div
                    className="absolute left-10"
                    onClick={() => {
                        onChangeCurrency(to, from);
                    }}
                >
                    <Icon path={mdiSwapVertical} size={1} />
                </div>
                {typeof from !== "undefined" && typeof to !== "undefined" && (
                    <Rate from={from} to={to} rate={rate} />
                )}
            </div>

            <CurrencyBlock
                currency={to}
                value={RoundValue({
                    value: rate * value,
                    strict: true,
                })}
                onChange={(code) => {
                    onChangeCurrency(code === from ? undefined : from, code);
                }}
            />
        </div>
    );
}

function CurrencyBlock({
    currency,
    value,
    onChange,
}: {
    currency?: CurrencyType;
    value: number;
    onChange: (code: CurrencyType) => void;
}) {
    const currencyList = useContext(CurrencyContext);

    const currencies = useMemo<
        {
            _id: ObjectId;
            currency: CurrencyType;
            title: string;
            value: number;
        }[]
    >(() => {
        const items: {
            _id: ObjectId;
            currency: CurrencyType;
            title: string;
            value: number;
        }[] = [];

        for (const currency of Object.keys(currencyList) as CurrencyType[]) {
            items.push({
                _id: currency as unknown as ObjectId,
                currency,
                title: currencyList[currency],
                value,
            });
        }

        return items;
    }, [currency, value, currencyList]);

    return (
        <BlurredSelector
            header="Выберите валюту"
            items={currencies}
            selected={currency as unknown as ObjectId}
            onChange={(code) => onChange(code as unknown as CurrencyType)}
            renderer={({ item, picker }) => (
                <CurrencyItem {...item} picker={picker} />
            )}
        />
    );
}

function CurrencyItem({
    currency,
    value,
    title,
    picker,
}: {
    currency: CurrencyType;
    value: number;
    title: string;
    picker?: boolean;
}) {
    return (
        <div className="px-6 h-10 flex gap-4 items-center justify-between">
            <CurrencyFlag currency={currency} />
            <span className="uppercase flex-grow">{currency}</span>
            {picker && <span>{title}</span>}
            {!picker && (
                <Amount currency={currency} value={value} iconSize={0.7} />
            )}
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
