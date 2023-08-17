import { Handler } from "@netlify/functions";
import withAuth from "../../../src/hooks/auth";
import { GetExchangeRates } from "../../../src/lib/exchange";

export const handler: Handler = withAuth(async (event, context) => {
    try {
        const rates = await GetExchangeRates();

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
});
