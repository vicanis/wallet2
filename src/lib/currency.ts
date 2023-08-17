import { MongoClient } from "mongodb";
import dayjs from "../../src/lib/dayjs";
import { CurrencyList, CurrencyResponse } from "../types/currency";
import { UpdateCurrencyList } from "./apilayer/update";

export async function GetCurrency(): Promise<CurrencyList> {
    let lastCurrency = await LoadCurrency();

    if (lastCurrency === null) {
        await UpdateCurrencyList();
        lastCurrency = await LoadCurrency();
    }

    if (lastCurrency === null) {
        throw new Error("no currency data");
    }

    return lastCurrency;
}

async function LoadCurrency(): Promise<CurrencyList | null> {
    const mongoclient = new MongoClient(process.env.MONGODB_URI!);

    const conn = mongoclient.connect();

    try {
        const db = (await conn).db("wallet2");
        const coll = db.collection<CurrencyResponse>("currency");

        const data = await coll.findOne(
            { timestamp: { $gte: dayjs().subtract(1, "month").toDate() } },
            { sort: { timestamp: -1 } }
        );

        if (data === null) {
            return data;
        }

        return data.currency;
    } finally {
        mongoclient.close();
    }
}
