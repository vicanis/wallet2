import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WithId } from "mongodb";
import fetcher from "../../lib/fetcher";
import Icon from "@mdi/react";
import { mdiPlusCircle } from "@mdi/js";
import Tabs from "../../components/tabs";
import WalletItem from "../../components/wallet/item";
import { Wallet, WalletSettingsItem } from "../../types/wallet";
import DashboardBalanceLayout from "../dashboard/balance";
import ImageHistory from "../../assets/history.svg";
import ImageExchange from "../../assets/exchange.svg";
import { DashboardItem } from "../dashboard";
import ContextMenuContainer from "../../components/contextmenu";
import ContextMenuItem from "../../components/contextmenu/item";
import ConfirmationPopup from "../../components/confirmation/popup";
import { ConfirmationContext } from "../../context/confirmation";
import LoadingLayout from "../loading";

export default function WalletSettingsLayout({
    list: fullList,
}: {
    list: WalletSettingsItem[];
}) {
    const navigate = useNavigate();

    const dashboardItems = useMemo<DashboardItem[]>(() => {
        return fullList.map(({ currency, wallets }) => ({
            currency,
            value: wallets.reduce((sum, item) => sum + item.value, 0),
        }));
    }, [fullList]);

    const [index, setIndex] = useState(0);

    const list = useMemo(() => {
        return fullList[index].wallets;
    }, [fullList, index]);

    const { setState } = useContext(ConfirmationContext);

    const [isReloading, setIsReloading] = useState(false);

    if (isReloading) {
        return <LoadingLayout />;
    }

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
                        title: "Удалить",
                        onClick: (id: string) => {
                            const item = list
                                .filter((item) => item._id.toString() === id)
                                .shift();

                            setState((state) => ({
                                ...state,
                                visible: true,
                                payload: item,
                            }));
                        },
                    },
                ]}
            >
                <div className="relative grid gap-6 px-8 py-6 text-lg">
                    {list.map((wallet, index) => (
                        <ContextMenuItem key={index} item={{ id: wallet._id }}>
                            <WalletItem {...wallet} />
                        </ContextMenuItem>
                    ))}
                </div>

                <ConfirmationPopup<WithId<Wallet>>
                    header="Удалить счет?"
                    handler={async (wallet) => {
                        if (typeof wallet === "undefined") {
                            return;
                        }

                        setIsReloading(true);

                        try {
                            await fetcher(
                                "del_wallet/?id=" + wallet._id.toString()
                            );

                            navigate(0);
                        } catch (e) {
                            setIsReloading(false);

                            throw e;
                        }
                    }}
                />
            </ContextMenuContainer>

            <div className="flex justify-center">
                <Link to="new">
                    <Icon path={mdiPlusCircle} size={2.5} color="#0084C8" />
                </Link>
            </div>
        </div>
    );
}
