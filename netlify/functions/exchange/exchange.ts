import { Handler } from "@netlify/functions";
import withAuth from "../../../src/hooks/auth";
import { GetExchangeRates } from "../../../src/lib/exchange";
import { GetCurrency } from "../../../src/lib/currency";

export const handler: Handler = withAuth(async (event, context) => {
    try {
        const [rates, currency] = await Promise.all([
            GetExchangeRates(),
            GetCurrency(),
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({ rates, currency }),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: e.toString(),
        };
    }
});
