import { MongoClient } from "mongodb";
import { CurrencyType } from "../types/currency";
import { ExchangeRates, ExchangeResponse } from "../types/exchange";
import GetCurrency from "./apilayer/currency";
import { UpdateExchangeRates } from "./apilayer/update";

export async function GetExchangeRates(): Promise<ExchangeRates> {
    const { rates } = await FetchExchangeRates();
    return ParseExchangeRates(rates);
}

async function ParseExchangeRates(
    rawRates: ExchangeResponse["rates"]
): Promise<ExchangeRates> {
    const usdRates: {
        [key: string]: number;
    } = {
        USD: 1,
    };

    for (const key in rawRates) {
        const code = key.substring(3);
        usdRates[code] = rawRates[key];
    }

    const currencyListRaw = await GetCurrency();

    const currencyList = Object.keys(currencyListRaw) as CurrencyType[];

    const rates: ExchangeRates = {};

    for (const source of currencyList) {
        rates[source] = {};

        for (const code of currencyList) {
            if (code === source) {
                continue;
            }

            const sourceRate = usdRates[source];
            const codeRate = usdRates[code];

            if (
                typeof sourceRate === "undefined" ||
                typeof codeRate === "undefined"
            ) {
                continue;
            }

            rates[source][code] = codeRate / sourceRate;
        }
    }

    return rates;
}

async function FetchExchangeRates(): Promise<ExchangeResponse> {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection<ExchangeResponse>("rate");

        const lastRates = await coll.findOne({}, { sort: { timestamp: -1 } });

        if (lastRates !== null) {
            return lastRates;
        }

        return UpdateExchangeRates();
    } finally {
        mongoclient.close();
    }
}

export async function GetExchangeRate({
    src,
    dst,
}: {
    src: CurrencyType;
    dst: CurrencyType;
}): Promise<number | undefined> {
    const rates = await GetExchangeRates();

    return rates?.[src]?.[dst];
}
