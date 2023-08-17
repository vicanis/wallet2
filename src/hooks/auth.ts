import { Handler } from "@netlify/functions";
import { AuthError } from "../lib/auth";

export default function withAuth(handler: Handler): Handler {
    return async (event, context) => {
        try {
            const response = await handler(event, context);

            if (!response) {
                throw new Error("no response");
            }

            return response;
        } catch (e) {
            if (e instanceof Error) {
                if (e instanceof AuthError) {
                    return {
                        statusCode: 401,
                        body: JSON.stringify({ code: e.code }),
                    };
                }

                console.error(e.toString());

                return {
                    statusCode: 500,
                    body: e.toString(),
                };
            }
        }

        return {
            statusCode: 500,
        };
    };
}
