import { LoaderFunctionArgs, defer } from "react-router-dom";
import fetcher from "../lib/fetcher";
import LoadablePage from "../components/loadable";
import InviteLayout from "../layouts/invite";

export default function InvitePage() {
    return <LoadablePage renderer={(data) => <InviteLayout {...data} />} />;
}

export function InviteLoader({ params }: LoaderFunctionArgs) {
    const { token = "none" } = params;

    return defer({
        data: Loader(token),
    });
}

async function Loader(token: string) {
    const resp = await fetcher("get_invitation/?token=" + token);
    const data = await resp.json();

    return data;
}
