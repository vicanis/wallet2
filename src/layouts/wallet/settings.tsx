import { useMemo, useState } from "react";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import Tabs from "../../components/tabs";
import WalletItem from "../../components/wallet/item";
import { Wallet } from "../../types/wallet";
import DashboardBalanceLayout from "../dashboard/balance";
import ImageHistory from "../../assets/history.svg";
import ImageExchange from "../../assets/exchange.svg";
import { CurrencyType } from "../../components/currency/selector";
import { DashboardItem } from "../dashboard";
import { Link } from "react-router-dom";

export default function WalletSettingsLayout() {
    const dashboardItems = useMemo<DashboardItem[]>(() => {
        return data.map(({ currency, wallets }) => ({
            currency,
            value: wallets.reduce((sum, item) => sum + item.value, 0),
        }));
    }, [data]);

    const [index, setIndex] = useState(0);

    const wallets = useMemo(() => {
        return data[index].wallets;
    }, [data, index]);

    return (
        <div>
            <DashboardBalanceLayout
                items={dashboardItems}
                onChangeIndex={setIndex}
            />

            <div className="h-2 bg-[#0084C8]" />

            <Tabs
                tabs={[
                    {
                        id: "history",
                        icon: ImageHistory,
                        name: "История переводов",
                    },
                    {
                        id: "transfer",
                        icon: ImageExchange,
                        name: "Создать перевод",
                    },
                ]}
                onSelect={() => {
                    //
                }}
                selected=""
            />

            <div className="grid gap-6 px-8 py-6 text-lg">
                {wallets.map((wallet, index) => (
                    <WalletItem key={index} wallet={wallet} />
                ))}
            </div>

            <div className="flex justify-center">
                <Link to="new">
                    <Icon path={mdiPlusCircle} size={2.5} color="#0084C8" />
                </Link>
            </div>
        </div>
    );
}

const data: {
    currency: CurrencyType;
    wallets: Wallet[];
}[] = [
    {
        currency: "RUB",
        wallets: [
            {
                name: "Наличные рубли",
                icon: "cash",
                currency: "RUB",
                value: 80000,
            },
            {
                name: "Тинькофф Света",
                icon: "card",
                currency: "RUB",
                value: 20000,
            },
        ],
    },
    {
        currency: "KZT",
        wallets: [
            {
                name: "Kaspi Gold Первая",
                icon: "card",
                currency: "KZT",
                value: 150000,
            },
            {
                name: "Halyk",
                icon: "card",
                currency: "KZT",
                value: 500000,
            },
        ],
    },
    {
        currency: "USD",
        wallets: [
            {
                name: "Наличные доллары",
                icon: "cash",
                currency: "USD",
                value: 200,
            },
        ],
    },
];
