import { useEffect, useState } from "react";
import type { Wallet } from "../../types/wallet";
import fetcher from "../../lib/fetcher";
import { ObjectId, WithId } from "mongodb";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { CurrencyIcon } from "../../components/currency/icon";

export default function ExchangeLayout({
    src,
    dst,
}: {
    src: ObjectId;
    dst: ObjectId;
}) {
    const [wallets, setWallets] = useState<WithId<Wallet>[]>();
    const [walletSrc, setWalletSrc] = useState<Wallet>();
    const [walletDst, setWalletDst] = useState<Wallet>();

    useEffect(() => {
        fetcher("get_wallets/?mode=plain")
            .then((data) => data.json())
            .then(setWallets);
    }, []);

    useEffect(() => {
        setWalletSrc(undefined);

        if (typeof wallets === "undefined") {
            return;
        }

        for (const wallet of wallets) {
            if (wallet._id.toString() === src.toString()) {
                setWalletSrc(wallet);
            }
        }
    }, [wallets, src]);

    useEffect(() => {
        setWalletDst(undefined);

        if (typeof wallets === "undefined") {
            return;
        }

        for (const wallet of wallets) {
            if (wallet._id.toString() === dst.toString()) {
                setWalletDst(wallet);
            }
        }
    }, [wallets, dst]);

    if (
        typeof wallets === "undefined" ||
        typeof walletSrc === "undefined" ||
        typeof walletDst === "undefined"
    ) {
        return null;
    }

    // no currency exchange
    if (walletSrc.currency === walletDst.currency) {
        return null;
    }

    return (
        <div className="text-sm">
            <div>Операция с обменом валюты:</div>
            <div className="flex items-center gap-1">
                <CurrencyIcon type={walletSrc.currency} size={0.7} />
                <Icon path={mdiArrowRight} size={0.5} />
                <CurrencyIcon type={walletDst.currency} size={0.7} />
            </div>
        </div>
    );
}
