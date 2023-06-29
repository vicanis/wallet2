import Icon from "@mdi/react";
import { CurrencyIcon } from "./currency/icon";
import { mdiCalculatorVariant, mdiChevronDown } from "@mdi/js";

export default function AmountEditor() {
    return (
        <div className="flex gap-5 items-center">
            <div className="relative">
                <CurrencyIcon type="RUB" />
                <Icon
                    path={mdiChevronDown}
                    size={0.75}
                    style={{
                        position: "absolute",
                        bottom: "-0.5em",
                        right: "-0.5em",
                    }}
                />
            </div>
            <input
                type="input"
                placeholder="Введите сумму"
                className="w-full mr-10"
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
