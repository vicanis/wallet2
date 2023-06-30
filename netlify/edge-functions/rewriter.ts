import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);

    console.log(
        "handle request from URL",
        request.url,
        "host",
        url.hostname,
        "path",
        url.pathname
    );

    // return new URL("/", request.url);
};
