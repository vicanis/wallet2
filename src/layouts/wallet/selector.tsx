import { useEffect, useState } from "react";
import { WithId } from "mongodb";
import { mdiChevronRight, mdiWallet } from "@mdi/js";
import Icon from "@mdi/react";
import type { Wallet } from "../../types/wallet";
import Radio from "../../components/radio";
import BlurredSelector from "../../components/blurredselector";

export default function WalletSelector() {
    const [wallets, setWallets] = useState<WithId<Wallet>[]>();

    useEffect(() => {
        fetch("/.netlify/functions/get_wallets/?mode=plain")
            .then((resp) => resp.json())
            .then(setWallets);
    }, []);

    return (
        <BlurredSelector
            header={<div className="text-sm">Выберите счет ...</div>}
            items={wallets}
            renderer={(arg) =>
                arg.picker ? (
                    <div className="flex items-center gap-3">
                        <Radio selected={arg.selected} />
                        <div className="w-full">
                            <Item {...arg.item} picker />
                        </div>
                    </div>
                ) : (
                    <Item {...arg.item} />
                )
            }
        />
    );
}

function Item({
    name,
    currency,
    value,
    picker = false,
}: Wallet & {
    picker?: boolean;
}) {
    return (
        <div className="flex gap-3 items-center justify-between w-full">
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
