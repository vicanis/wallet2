import { defer } from "react-router-dom";
import fetcher from "../../../lib/fetcher";
import WalletSettingsLayout from "../../../layouts/wallet/list";
import LoadablePage from "../../../components/loadable";
import ConfirmationProvider from "../../../components/confirmation/provider";

export default function WalletSettingsPage() {
    return (
        <LoadablePage
            renderer={(data) => (
                <ConfirmationProvider>
                    <WalletSettingsLayout list={data} />
                </ConfirmationProvider>
            )}
        />
    );
}

export function WalletListLoader() {
    return defer({
        data: Loader(),
    });
}

async function Loader() {
    const resp = await fetcher("get_wallets");
    const data = await resp.json();

    return data;
}
