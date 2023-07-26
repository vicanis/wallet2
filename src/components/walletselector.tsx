import { useEffect, useLayoutEffect, useState } from "react";
import { WithId } from "mongodb";
import { mdiChevronRight, mdiWallet } from "@mdi/js";
import Icon from "@mdi/react";
import type { Wallet } from "../types/wallet";
import Blur from "./blur";
import Radio from "./radio";

export default function WalletSelector() {
    const [wallets, setWallets] = useState<WithId<Wallet>[]>();
    const [selectedItem, setSelectedItem] = useState<WithId<Wallet>>();
    const [isOpened, setOpened] = useState(false);

    useEffect(() => {
        fetch("/.netlify/functions/get_wallets/?mode=plain")
            .then((resp) => resp.json())
            .then(setWallets);
    }, []);

    useLayoutEffect(() => {
        if (typeof wallets === "undefined") {
            return;
        }

        setSelectedItem(wallets[0]);
    }, [wallets]);

    if (typeof wallets === "undefined") {
        return <div>Загрузка ...</div>;
    }

    if (typeof selectedItem === "undefined") {
        return <div>Не выбран</div>;
    }

    if (isOpened) {
        return (
            <Blur>
                <div className="h-full flex items-center justify-center">
                    <div
                        className="grid gap-5 w-full mx-4 py-5 px-2"
                        style={{
                            borderRadius: "0.9375rem",
                            border: "2px solid #E9EEF1",
                            background: "#FAFAFA",
                            boxShadow:
                                "4px 4px 20px 0px rgba(31, 147, 206, 0.30)",
                        }}
                    >
                        <div className="text-sm">Выберите счет ...</div>

                        {wallets.map((wallet, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setOpened(false);
                                    setSelectedItem(wallet);
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <Radio
                                        selected={
                                            wallet._id.toString() ===
                                            selectedItem._id.toString()
                                        }
                                    />
                                    <div className="w-full">
                                        <Item {...wallet} picker />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Blur>
        );
    }

    return (
        <div onClick={() => setOpened(true)}>
            <Item {...selectedItem} />
        </div>
    );
}

function Item({
    name,
    currency,
    value,
    picker = false,
    ...rest
}: Wallet &
    React.HTMLAttributes<HTMLDivElement> & {
        picker?: boolean;
    }) {
    return (
        <div
            className="flex gap-3 items-center justify-between w-full"
            {...rest}
        >
            <Icon path={mdiWallet} size={1} color="#1F93CE" />
            <div className="flex-grow">
                <div>{name}</div>
                {picker && (
                    <span className="flex justify-start gap-2 text-xs">
                        {value} {currency}
                    </span>
                )}
            </div>
            <Icon path={mdiChevronRight} size={1} />
        </div>
    );
}
