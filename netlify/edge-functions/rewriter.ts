import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    const { pathname } = new URL(request.url);

    if (pathname.indexOf("/static") === 0) {
        return;
    }

    return new URL("/", request.url);
};
