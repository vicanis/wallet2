import {
    mdiBasketball,
    mdiBottleTonicPlus,
    mdiCarHatchback,
    mdiCart,
    mdiCashMultiple,
    mdiCreditCardMultiple,
    mdiFood,
    mdiHelpCircleOutline,
} from "@mdi/js";
import Icon from "@mdi/react";

export default function CategoryIcon({
    icon,
    color = "#aaa",
    size = 1,
}: {
    icon?: string;
    color?: string;
    size?: number;
}) {
    const path =
        typeof icon !== "undefined"
            ? Icons[icon as IconType] ?? mdiHelpCircleOutline
            : mdiHelpCircleOutline;

    return (
        <div
            className="p-3"
            style={{
                color: "#fff",
                backgroundColor: color,
                borderRadius: "50%",
            }}
        >
            <Icon path={path} size={size} />
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
