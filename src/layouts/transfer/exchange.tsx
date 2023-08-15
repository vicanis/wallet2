import { useEffect, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import type { Wallet } from "../../types/wallet";
import fetcher from "../../lib/fetcher";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import { CurrencyIcon } from "../../components/currency/icon";
import withExchange from "../../hooks/exchange";
import RoundedAmount from "../../components/rounded";

export default function ExchangeLayout({
    value = 1,
    src,
    dst,
}: {
    value?: number;
    src: ObjectId;
    dst: ObjectId;
}) {
    const [wallets, setWallets] = useState<WithId<Wallet>[]>();
    const [walletSrc, setWalletSrc] = useState<Wallet>();
    const [walletDst, setWalletDst] = useState<Wallet>();

    const exchangeRate = withExchange({
        src: walletSrc?.currency,
        dst: walletDst?.currency,
    });

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
    if (
        walletSrc.currency === walletDst.currency ||
        typeof exchangeRate === "undefined"
    ) {
        return null;
    }

    return (
        <div className="text-sm">
            <div>Операция с обменом валюты:</div>
            <div className="flex items-center gap-1">
                {value}
                <CurrencyIcon type={walletSrc.currency} size={0.7} />
                <Icon path={mdiArrowRight} size={0.5} />
                <RoundedAmount value={value * exchangeRate} strict />
                <CurrencyIcon type={walletDst.currency} size={0.7} />
            </div>
        </div>
    );
}
