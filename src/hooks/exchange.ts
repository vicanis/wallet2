import { useEffect, useMemo, useState } from "react";
import { CurrencyType } from "../types/currency";
import { ExchangeRates } from "../types/exchange";
import fetcher from "../lib/fetcher";

export default function withExchange({
    src,
    dst,
}: {
    src: CurrencyType;
    dst: CurrencyType;
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
            typeof rates[src] === "undefined" ||
            typeof rates[dst] === "undefined"
        ) {
            return;
        }

        return rates[src][dst];
    }, [src, dst]);

    return rate;
}
