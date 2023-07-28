import { CurrencyIcon } from "./currency/icon";
import { CurrencyType } from "../types/currency";

export default function Amount({
    currency,
    value,
    iconSize = 1,
    ...rest
}: {
    currency: CurrencyType;
    value: number;
    iconSize?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex gap-1 items-center" {...rest}>
            <CurrencyIcon type={currency} size={iconSize} />
            <span>
                {value.toLocaleString("ru-RU", {
                    useGrouping: true,
                })}
            </span>
        </div>
    );
}
