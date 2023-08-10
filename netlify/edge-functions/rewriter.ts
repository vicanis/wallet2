import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    const { pathname } = new URL(request.url);

    if (pathname === "/" || pathname.indexOf("/static") === 0) {
        return;
    }

    for (const page of [
        "/expense",
        "/income",
        "/stats",
        "/exchange",
        "/welcome",
        "/login",
        "/settings",
    ]) {
        if (pathname.indexOf(page) === 0) {
            return new URL("/", request.url);
        }
    }
};
