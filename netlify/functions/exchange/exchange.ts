import { Handler } from "@netlify/functions";
import { UpdateExchangeRates } from "../../../src/lib/apilayer/update";
import { MongoClient } from "mongodb";
import { ExchangeRates, ExchangeResponse } from "../../../src/types/exchange";
import { CurrencyType } from "../../../src/types/currency";
import GetCurrency from "../../../src/lib/apilayer/currency";

export const handler: Handler = async (event, context) => {
    try {
        const { rates: rawRates } = await GetExchangeRates();

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

        return {
            statusCode: 200,
            body: JSON.stringify(rates),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
};

async function GetExchangeRates(): Promise<ExchangeResponse> {
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
