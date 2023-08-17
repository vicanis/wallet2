import { defer } from "react-router-dom";
import ExchangeLayout from "../layouts/exchange";
import fetcher from "../lib/fetcher";
import LoadablePage from "../components/loadable";
import { CurrencyContext } from "../context/currency";

export default function ExchangePage() {
    return (
        <div className="py-4">
            <LoadablePage
                renderer={(data) => (
                    <CurrencyContext.Provider value={data.currency}>
                        <ExchangeLayout rates={data.rates} />
                    </CurrencyContext.Provider>
                )}
            />
        </div>
    );
}

export function ExchangePageLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetcher("exchange");
    const data = await resp.json();

    return data;
}
