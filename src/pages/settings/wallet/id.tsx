import { LoaderFunctionArgs, defer } from "react-router-dom";
import fetcher from "../../../lib/fetcher";
import LoadablePage from "../../../components/loadable";
import WalletEditor from "../../../layouts/wallet/editor";

export default function WalletSettingsItemPage() {
    return <LoadablePage renderer={(data) => <WalletEditor {...data} />} />;
}

export function WalletItemLoader({ params }: LoaderFunctionArgs) {
    const { id } = params;

    if (typeof id === "undefined") {
        return Promise.reject();
    }

    switch (id) {
        case "new":
        case "other":
            return defer({
                data: {
                    _id: id,
                    name: "",
                    currency: "RUB",
                    value: 0,
                    icon: "",
                },
            });
    }

    return defer({
        data: Loader(id),
    });
}

async function Loader(id: string) {
    const resp = await fetcher("get_wallet/?id=" + id);
    const data = await resp.json();

    return data;
}
