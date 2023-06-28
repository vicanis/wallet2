import { CurrencyIcon } from "./icon";

export default function Selector({
    list,
    selected,
}: {
    list: CurrencyType[];
    selected: CurrencyType;
}) {
    return (
        <span className="flex gap-1 justify-center">
            {list.map((type) => (
                <CurrencyIcon
                    key={type}
                    type={type as CurrencyType}
                    className={selected !== type ? "opacity-50" : ""}
                />
            ))}
        </span>
    );
}

export type CurrencyType = "RUB" | "KZT" | "USD";
