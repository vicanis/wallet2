import { useState } from "react";
import { mdiChevronDown } from "@mdi/js";
import Icon from "@mdi/react";
import { CurrencyType } from "../../types/currency";

export default function CurrencyMiniSelector({
    currency,
    onChange,
}: {
    currency: CurrencyType;
    onChange: (currency: CurrencyType) => void;
}) {
    const [opened, setOpened] = useState(false);

    return (
        <div
            className="relative text-[#161414]"
            onClick={() => setOpened((flag) => !flag)}
        >
            <div>{currency}</div>
            <div className="absolute -bottom-4 w-full">
                <Icon
                    path={mdiChevronDown}
                    size={1}
                    className="mx-auto text-[#1F93CE]"
                />
                {opened && (
                    <div className="absolute w-20 right-0 px-4 py-3 border-2 grid gap-4 bg-white max-h-[200px] overflow-x-hidden overflow-y-auto">
                        {CurrencyList.map((currency) => (
                            <div
                                key={currency}
                                onClick={() => onChange(currency)}
                            >
                                {currency}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const CurrencyList: CurrencyType[] = ["RUB", "KZT", "USD"];
