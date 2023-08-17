import { ApiLayerCurrencyList } from "../../types/apilayer";
import ApiCall from "./api";

export default async function FetchCurrency() {
    const resp = await ApiCall<ApiLayerCurrencyList>("list");

    return resp.currencies;
}
