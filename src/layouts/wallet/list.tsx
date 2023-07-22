import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import Tabs from "../../components/tabs";
import WalletItem from "../../components/wallet/item";
import { WalletSettingsItem } from "../../types/wallet";
import DashboardBalanceLayout from "../dashboard/balance";
import ImageHistory from "../../assets/history.svg";
import ImageExchange from "../../assets/exchange.svg";
import { DashboardItem } from "../dashboard";
import ContextMenuContainer from "../../components/contextmenu";
import ContextMenuItem from "../../components/contextmenu/item";

export default function WalletSettingsLayout({
    list,
}: {
    list: WalletSettingsItem[];
}) {
    const dashboardItems = useMemo<DashboardItem[]>(() => {
        return list.map(({ currency, wallets }) => ({
            currency,
            value: wallets.reduce((sum, item) => sum + item.value, 0),
        }));
    }, [list]);

    const [index, setIndex] = useState(0);

    const wallets = useMemo(() => {
        return list[index].wallets;
    }, [list, index]);

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

            <ContextMenuContainer
                items={[
                    {
                        title: "Реорганизовать",
                        onClick: () => {
                            //
                        },
                    },
                    {
                        title: "Удалить",
                        onClick: (index) => {
                            //
                        },
                    },
                ]}
            >
                <div className="relative grid gap-6 px-8 py-6 text-lg">
                    {wallets.map((wallet, index) => (
                        <ContextMenuItem
                            key={index}
                            item={{ index, id: wallet._id }}
                        >
                            <WalletItem {...wallet} />
                        </ContextMenuItem>
                    ))}
                </div>
            </ContextMenuContainer>

            <div className="flex justify-center">
                <Link to="new">
                    <Icon path={mdiPlusCircle} size={2.5} color="#0084C8" />
                </Link>
            </div>
        </div>
    );
}
