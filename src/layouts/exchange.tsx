import { useCallback, useMemo, useState } from "react";
import Converter from "../components/exchange/converter";
import Keyboard, {
    KeyboardButtonHandler,
} from "../components/exchange/keyboard";
import { CurrencyType } from "../types/currency";

export default function Exchange() {
    const [currencyFrom, setCurrencyFrom] = useState<CurrencyType>("RUB");
    const [currencyTo, setCurrencyTo] = useState<CurrencyType>("USD");

    const exchangeRate = useMemo(() => {
        return Rates[currencyFrom][currencyTo];
    }, [currencyFrom, currencyTo]);

    const [value, setValue] = useState<number>(1000);

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

const Rates = {
    RUB: {
        RUB: 1,
        USD: 80,
        KZT: 5.5,
    },
    KZT: {
        KZT: 1,
        USD: 480,
        RUB: 0.18,
    },
    USD: {
        USD: 1,
        RUB: 0.0125,
        KZT: 0.002083333,
    },
};
