import { defer } from "react-router-dom";
import fetcher from "../lib/fetcher";
import LoadablePage from "../components/loadable";
import HistoryLayout from "../layouts/history";

export default function HistoryPage() {
    return <LoadablePage renderer={(data) => <HistoryLayout list={data} />} />;
}

export function HistoryLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetcher("get_history");
    const data = await resp.json();

    return data;
}
