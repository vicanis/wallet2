import { WithId } from "mongodb";
import { Link } from "react-router-dom";
import { Wallet } from "../../types/wallet";
import Amount from "../amount";
import CategoryIcon from "../category/icon";

export default function WalletItem({ _id, ...wallet }: WithId<Wallet>) {
    return (
        <Link to={_id.toString()}>
            <div className="flex items-center gap-3">
                <CategoryIcon
                    icon={wallet.icon}
                    color={wallet.color ?? "#1F93CE"}
                    circle={false}
                    className=""
                    size={1.5}
                />
                <div className="flex-grow">{wallet.name}</div>
                <Amount
                    currency={wallet.currency}
                    value={wallet.value}
                    iconSize={0.8}
                />
            </div>
        </Link>
    );
}
