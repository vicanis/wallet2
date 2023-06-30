import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    console.log("redirect URL", request.url);
    return new URL("/", request.url);
};
