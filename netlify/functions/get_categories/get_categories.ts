import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
    const params = event.queryStringParameters;

    if (params === null) {
        return {
            statusCode: 403,
        };
    }

    const { name = "stranger" } = params;

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello, ${name}!`,
        }),
    };
};
