import { defer } from "react-router-dom";
import LoadablePage from "../../components/loadable";
import ShareLayout from "../../layouts/share";
import fetcher from "../../lib/fetcher";

export default function SharePage() {
    return (
        <LoadablePage renderer={(data) => <ShareLayout invitation={data} />} />
    );
}

export function ShareListLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetcher("invitation");
    const data = await resp.json();

    return data;
}
