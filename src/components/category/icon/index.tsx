import {
    mdiBasketball,
    mdiBottleTonicPlus,
    mdiCarHatchback,
    mdiCart,
    mdiCashMultiple,
    mdiCreditCardMultiple,
    mdiFood,
} from "@mdi/js";
import Icon from "@mdi/react";

export default function CategoryIcon({
    icon,
    color,
    size = 1,
}: {
    icon: string;
    color: string;
    size?: number;
}) {
    return (
        <div
            className="p-1"
            style={{
                color: "#fff",
                backgroundColor: color,
                borderRadius: "50%",
            }}
        >
            <Icon path={icon} size={size} />
        </div>
    );
}

export const Icons = {
    grocery: mdiCart,
    auto: mdiCarHatchback,
    food: mdiFood,
    medical: mdiBottleTonicPlus,
    basketball: mdiBasketball,
    card: mdiCreditCardMultiple,
    cash: mdiCashMultiple,
};

export type IconType = keyof typeof Icons;
