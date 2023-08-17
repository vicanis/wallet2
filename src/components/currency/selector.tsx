import { useContext, useMemo } from "react";
import { ObjectId } from "mongodb";
import { CurrencyType } from "../../types/currency";
import { CurrencyContext } from "../../context/currency";
import BlurredSelector from "../blurredselector";
import CurrencyFlag from "./flag";
import Amount from "../amount";

export default function CurrencySelector({
    currency,
    value,
    onChange,
    mini,
}: {
    currency?: CurrencyType;
    value: number;
    onChange: (code: CurrencyType) => void;
    mini?: boolean;
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
                <CurrencyItem {...item} {...{ picker, mini }} />
            )}
        />
    );
}

function CurrencyItem({
    currency,
    value,
    title,
    picker,
    mini,
}: {
    currency: CurrencyType;
    value: number;
    title: string;
    picker?: boolean;
    mini?: boolean;
}) {
    if (mini && !picker) {
        return (
            <div className="flex items-center gap-2">
                <CurrencyFlag currency={currency} />
                <span>{currency}</span>
            </div>
        );
    }

    return (
        <div
            className={`${
                picker ? "px-2" : "px-6"
            } h-10 flex gap-4 items-center justify-between`}
        >
            <CurrencyFlag currency={currency} />
            <span className="flex-grow">{title}</span>
            {picker ? (
                <span className="text-sm">{currency}</span>
            ) : (
                <Amount currency={currency} value={value} iconSize={0.7} />
            )}
        </div>
    );
}
