import { useEffect, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import { Link } from "react-router-dom";
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import type { Wallet } from "../../types/wallet";
import Radio from "../../components/radio";
import BlurredSelector from "../../components/blurredselector";
import CategoryIcon from "../../components/category/icon";

export default function WalletSelector(props: {
    selected?: ObjectId;
    onChange: (id: ObjectId) => void;
}) {
    const [wallets, setWallets] = useState<WithId<Wallet>[]>();

    useEffect(() => {
        fetch("/.netlify/functions/get_wallets/?mode=plain")
            .then((resp) => resp.json())
            .then((wallets: WithId<Wallet>[]) => {
                setWallets(wallets);

                if (typeof props.selected === "undefined") {
                    props.onChange(wallets[0]._id);
                }
            });
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
            createButtonRenderer={() => (
                <Link to="/settings/wallet/new">Добавить новый счет</Link>
            )}
            {...props}
        />
    );
}

function Item({
    name,
    currency,
    value,
    icon,
    color,
    picker = false,
}: Wallet & {
    picker?: boolean;
}) {
    return (
        <div className="flex gap-3 items-center justify-between w-full">
            <CategoryIcon icon={icon} color={color} />
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
