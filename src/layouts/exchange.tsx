import { useCallback, useMemo, useState } from "react";
import Converter from "../components/exchange/converter";
import Keyboard, {
    KeyboardButtonHandler,
} from "../components/exchange/keyboard";
import { CurrencyType } from "../types/currency";
import { ExchangeRates } from "../types/exchange";
import Blur from "../components/blur";
import LoadingLayout from "./loading";

export default function ExchangeLayout({ rates }: { rates: ExchangeRates }) {
    const [currencyFrom, setCurrencyFrom] = useState<CurrencyType>("RUB");
    const [currencyTo, setCurrencyTo] = useState<CurrencyType>("USD");

    const exchangeRate = useMemo(() => {
        if (
            typeof rates[currencyFrom] === "undefined" ||
            typeof rates[currencyTo] === "undefined"
        ) {
            return;
        }

        return rates[currencyFrom][currencyTo];
    }, [currencyFrom, currencyTo]);

    const [value, setValue] = useState<number>(0);

    const keyboardHandler = useCallback<KeyboardButtonHandler>((arg) => {
        switch (arg.type) {
            case "digit":
                setValue((value) => value * 10 + arg.digit);
                break;

            case "backspace":
                setValue((value) => {
                    if (value === 0) {
                        return value;
                    }

                    if (value < 10) {
                        return 0;
                    }

                    return Math.trunc(value / 10);
                });
                break;

            case "comma":
                break;
        }
    }, []);

    if (typeof exchangeRate === "undefined") {
        return (
            <Blur>
                <LoadingLayout>Загрузка данных ...</LoadingLayout>
            </Blur>
        );
    }

    return (
        <div className="grid gap-4">
            <Converter
                value={value}
                from={currencyFrom}
                to={currencyTo}
                rate={exchangeRate}
                onChangeCurrency={(from: CurrencyType, to: CurrencyType) => {
                    setCurrencyFrom(from);
                    setCurrencyTo(to);
                }}
            />
            <Keyboard onClick={keyboardHandler} />
        </div>
    );
}
