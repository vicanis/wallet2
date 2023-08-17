import { MongoClient } from "mongodb";
import dayjs from "../../lib/dayjs";
import type { CurrencyResponse } from "../../types/currency";
import type { ExchangeResponse } from "../../types/exchange";
import FetchCurrency from "./currency";
import GetExchangeRates from "./exchange";

export default async function UpdateCurrencyData() {
    await Promise.all([UpdateCurrencyList(), UpdateExchangeRates()]);
}

export async function UpdateCurrencyList() {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");

        const coll = db.collection<CurrencyResponse>("currency");

        const lastCurrencyList = await coll.findOne(
            { timestamp: { $gt: dayjs().subtract(1, "month").toDate() } },
            { sort: { timestamp: -1 } }
        );

        if (lastCurrencyList === null) {
            const list = await FetchCurrency();

            await coll.insertOne({
                timestamp: dayjs().toDate(),
                currency: list,
            });
        }
    } finally {
        mongoclient.close();
    }
}

export async function UpdateExchangeRates() {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");

        const coll = db.collection<ExchangeResponse>("rate");

        const lastExchangeRates = await coll.findOne(
            { timestamp: { $gt: dayjs().subtract(1, "day").toDate() } },
            { sort: { timestamp: -1 } }
        );

        if (lastExchangeRates === null) {
            const { rates, source, timestamp } = await GetExchangeRates();

            const actualRates: ExchangeResponse = {
                timestamp: dayjs(timestamp * 1000).toDate(),
                source,
                rates,
            };

            await coll.insertOne(actualRates);

            return actualRates;
        }

        return lastExchangeRates;
    } finally {
        mongoclient.close();
    }
}
