import { ApiLayerResponse } from "../../types/apilayer";

export default async function ApiCall<T extends {}>(
    action: string,
    args?: any
): Promise<T> {
    const apikey = process.env.APILAYER_KEY!;

    let url = `https://api.apilayer.com/currency_data/${action}`;

    if (typeof args !== "undefined") {
        url += "?" + new URLSearchParams(args).toString();
    }

    const resp = await fetch(url, { headers: { apikey } });

    const data: ApiLayerResponse<T> = await resp.json();

    if (data.success === true) {
        return data;
    }

    throw new Error(data.message);
}
