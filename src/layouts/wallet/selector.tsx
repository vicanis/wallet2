import { useEffect, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import { Link } from "react-router-dom";
import fetcher from "../../lib/fetcher";
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import type { Wallet } from "../../types/wallet";
import Radio from "../../components/radio";
import BlurredSelector from "../../components/blurredselector";
import CategoryIcon from "../../components/category/icon";
import Amount from "../../components/amount";

export default function WalletSelector(props: {
    selected?: ObjectId;
    onChange: (id: ObjectId, items?: ObjectId[]) => void;
    withBalance?: boolean;
}) {
    const [wallets, setWallets] = useState<WithId<Wallet>[]>();

    useEffect(() => {
        fetcher("get_wallets/?mode=plain")
            .then((resp) => resp.json())
            .then((wallets: WithId<Wallet>[]) => {
                setWallets(wallets);

                if (typeof props.selected === "undefined") {
                    return;
                }

                if (wallets.length > 0) {
                    props.onChange(
                        wallets[0]._id,
                        wallets.map((item) => item._id)
                    );
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
                    <Item {...arg.item} withBalance={props.withBalance} />
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
    withBalance = false,
}: Wallet & {
    picker?: boolean;
    withBalance?: boolean;
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
            {withBalance && (
                <Amount currency={currency} value={value} iconSize={0.7} />
            )}
            <Icon path={mdiChevronRight} size={1} />
        </div>
    );
}
