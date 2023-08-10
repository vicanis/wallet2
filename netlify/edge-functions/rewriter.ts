import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
    const { pathname } = new URL(request.url);

    if (pathname.indexOf("/static") === 0) {
        return;
    }

    console.log("pathname", pathname);

    return new URL("/", request.url);
};
