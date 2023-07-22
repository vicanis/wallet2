import { defer } from "react-router-dom";
import WalletSettingsLayout from "../../../layouts/wallet/list";
import LoadablePage from "../../../components/loadable";

export default function WalletSettingsPage() {
    return (
        <LoadablePage
            renderer={(data) => <WalletSettingsLayout list={data} />}
        />
    );
}

export function WalletListLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetch("/.netlify/functions/get_wallets");
    const data = await resp.json();

    return data;
}
