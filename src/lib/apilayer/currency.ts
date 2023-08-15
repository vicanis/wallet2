import { ApiLayerCurrencyList } from "../../types/apilayer";
import ApiCall from "./api";

export default async function GetCurrency() {
    const resp = await ApiCall<ApiLayerCurrencyList>("list");

    return resp.currencies;
}
