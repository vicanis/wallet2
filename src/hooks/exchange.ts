import { useEffect, useMemo, useState } from "react";
import { CurrencyType } from "../types/currency";
import { ExchangeRates } from "../types/exchange";
import fetcher from "../lib/fetcher";

export default function useExchangeRate({
    src,
    dst,
}: {
    src?: CurrencyType;
    dst?: CurrencyType;
}) {
    const [rates, setRates] = useState<ExchangeRates>();

    useEffect(() => {
        fetcher("exchange")
            .then((resp) => resp.json())
            .then(setRates);
    }, []);

    const rate = useMemo(() => {
        if (
            typeof rates === "undefined" ||
            typeof src === "undefined" ||
            typeof rates[src] === "undefined" ||
            typeof dst === "undefined" ||
            typeof rates[dst] === "undefined"
        ) {
            return;
        }

        return rates[src][dst];
    }, [rates, src, dst]);

    return rate;
}
