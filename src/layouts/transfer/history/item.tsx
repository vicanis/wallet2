import { Fragment } from "react";
import Icon from "@mdi/react";
import { mdiArrowDown } from "@mdi/js";
import { TransferItem } from "../../../types/transfer";
import { Wallet } from "../../../types/wallet";
import Amount from "../../../components/amount";
import CategoryIcon from "../../../components/category/icon";

export default function TransferHistoryItem({
    src,
    dst,
    amount,
    amountDst,
    user,
}: TransferItem) {
    return (
        <div className="grid gap-2">
            {typeof user !== "undefined" && (
                <div className="border-b-[1px] px-4">
                    <span className="text-sm">{user}</span>
                </div>
            )}
            <div
                className="px-4 gap-3 grid items-center"
                style={{
                    gridTemplateAreas: `'arrow walletsrc amountsrc' 'arrow walletdst amountdst'`,
                    gridTemplateColumns: "max-content 1fr max-content",
                }}
            >
                <div style={{ gridArea: "arrow" }}>
                    <Icon path={mdiArrowDown} size={1} />
                </div>
                <div style={{ gridArea: "walletsrc" }}>
                    <WalletItem {...src} />
                </div>
                <div style={{ gridArea: "walletdst" }}>
                    <WalletItem {...dst} />
                </div>
                {typeof amountDst === "undefined" ? (
                    <div style={{ gridRow: "1 / 3" }}>
                        <Amount iconSize={0.7} {...amount} />
                    </div>
                ) : (
                    <Fragment>
                        <div
                            className="justify-self-end"
                            style={{ gridArea: "amountsrc" }}
                        >
                            <Amount iconSize={0.7} {...amount} />
                        </div>
                        <div
                            className="justify-self-end"
                            style={{ gridArea: "amountdst" }}
                        >
                            <Amount iconSize={0.7} {...amountDst} />
                        </div>
                    </Fragment>
                )}
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
