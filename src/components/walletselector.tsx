import { mdiChevronRight, mdiWallet } from "@mdi/js";
import Icon from "@mdi/react";

export default function WalletSelector() {
    return (
        <div className="flex gap-3 justify-between w-full">
            <Icon path={mdiWallet} size={1} color="#1F93CE" />
            <span className="flex-grow">Наличные</span>
            <Icon path={mdiChevronRight} size={1} />
        </div>
    );
}
