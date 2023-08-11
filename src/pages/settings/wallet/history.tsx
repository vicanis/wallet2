import { defer } from "react-router-dom";
import fetcher from "../../../lib/fetcher";
import LoadablePage from "../../../components/loadable";
import TransferLayout from "../../../layouts/transfer";

export default function TransferHistoryPage() {
    return <LoadablePage renderer={(data) => <TransferLayout data={data} />} />;
}

export function TransferHistoryLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetcher("transfer/?mode=list");
    const data = await resp.json();

    return data;
}
