import dayjs from "../../../lib/dayjs";
import Icon from "@mdi/react";
import { mdiArrowDown } from "@mdi/js";
import { TransferItem } from "../../../types/transfer";
import { Wallet } from "../../../types/wallet";
import Amount from "../../../components/amount";
import CategoryIcon from "../../../components/category/icon";

export default function TransferHistoryItem({
    date,
    src,
    dst,
    amount,
    user,
}: TransferItem) {
    return (
        <div className="grid gap-2">
            <div className="border-b-[1px] px-4">
                {dayjs(date).format("DD MMMM, dddd")}
            </div>
            <div className="px-4 flex items-center gap-3">
                <Icon path={mdiArrowDown} size={1} />
                <div className="grid gap-2 grow">
                    <WalletItem {...src} />
                    <WalletItem {...dst} />
                </div>
                <div className="text-center">
                    <Amount iconSize={0.7} {...amount} />
                    {typeof user !== "undefined" && (
                        <span className="text-sm">{user}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

function WalletItem({
    name,
    icon,
    color,
}: Pick<Wallet, "name" | "icon" | "color">) {
    return (
        <div className="flex items-center gap-3">
            <CategoryIcon
                icon={icon}
                color={color ?? "#1F93CE"}
                circle={false}
                className=""
                size={1.5}
            />
            <div className="flex-grow">{name}</div>
        </div>
    );
}
