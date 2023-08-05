import Auth from "./auth";

export default function fetcher(
    action: string,
    params: RequestInit,
    data: any
) {
    if (params.method === "POST") {
        params.body = JSON.stringify(data);
    }

    return fetch(`/.netlify/functions/${action}`, {
        ...params,
        headers: {
            Authorization: `Bearer ${Auth.User.token}`,
        },
    });
}
