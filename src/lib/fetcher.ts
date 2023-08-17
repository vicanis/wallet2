import Auth, { AuthError, AuthErrorResponse } from "./auth";

export default async function fetcher(
    action: string,
    params: RequestInit = {},
    data: any = undefined
): Promise<Response> {
    if (params.method === "POST") {
        params.body = JSON.stringify(data);
    }

    const resp = await fetch(`/.netlify/functions/${action}`, {
        ...params,
        headers: {
            Authorization: `Bearer ${Auth.User.token}`,
        },
    });

    if (!resp.ok) {
        const { code } = (await resp.json()) as AuthErrorResponse;
        throw new AuthError(code);
    }

    return resp;
}
