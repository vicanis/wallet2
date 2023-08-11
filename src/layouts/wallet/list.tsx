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
import Warning from "../../components/warning";

export default function WalletSettingsLayout({
    list: fullList,
}: {
    list: WalletSettingsItem[];
}) {
    const navigate = useNavigate();

    const dashboardItems = useMemo<DashboardItem[]>(() => {
        if (!fullList.length) {
            return [];
        }

        return fullList.map(({ currency, wallets }) => ({
            currency,
            value: wallets.reduce((sum, item) => sum + item.value, 0),
        }));
    }, [fullList]);

    const [index, setIndex] = useState(0);

    const list = useMemo(() => {
        if (!fullList.length) {
            return [];
        }

        return fullList[index].wallets;
    }, [fullList, index]);

    const { confirmationState, setConfirmationState } =
        useContext(ConfirmationContext);

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

            <div className="flex justify-around items-center p-4 text-center bg-[#0084c8] text-white text-sm rounded-b-lg">
                <Link to="history" className="flex flex-col gap-2">
                    <img src={ImageHistory} className="mx-auto h-5" />
                    <div>История переводов</div>
                </Link>
                <Link to="transfer" className="flex flex-col gap-2">
                    <img src={ImageExchange} className="mx-auto h-5" />
                    <div>Создать перевод</div>
                </Link>
            </div>

            <ContextMenuContainer
                items={[
                    {
                        title: "Удалить",
                        onClick: (id: string) => {
                            const item = list
                                .filter((item) => item._id.toString() === id)
                                .shift();

                            setConfirmationState((state) => ({
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

                {list.length > 1 && (
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
                )}

                {list.length <= 1 && confirmationState.visible && (
                    <Warning
                        onClick={() =>
                            setConfirmationState((state) => ({
                                ...state,
                                visible: false,
                            }))
                        }
                    >
                        Невозможно удалить последний счет.
                    </Warning>
                )}
            </ContextMenuContainer>

            <div className="flex justify-center">
                <Link to="new">
                    <Icon path={mdiPlusCircle} size={2.5} color="#0084C8" />
                </Link>
            </div>
        </div>
    );
}
