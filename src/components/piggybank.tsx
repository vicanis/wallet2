import { mdiCircle, mdiCurrencyUsd, mdiPiggyBankOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function PiggyBank() {
    return (
        <div className="relative w-max mx-auto">
            <Icon
                path={mdiPiggyBankOutline}
                size={4}
                color="#0084C8"
                style={{ margin: "auto" }}
            />
            <div className="absolute top-0 left-[1.9em]">
                <DollarCoin />
            </div>
        </div>
    );
}

function DollarCoin() {
    return (
        <div className="relative">
            <Icon path={mdiCircle} size={1} color="#D9AE16" />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <Icon path={mdiCurrencyUsd} size={0.8} color="#0084C8" />
            </div>
        </div>
    );
}
