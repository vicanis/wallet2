import {
    mdiBasketball,
    mdiBottleTonicPlus,
    mdiCarHatchback,
    mdiCart,
    mdiCreditCardCheckOutline,
    mdiFood,
    mdiHelp,
    mdiPlus,
    mdiWallet,
} from "@mdi/js";
import Icon from "@mdi/react";
import { CSSProperties } from "react";

export default function CategoryIcon({
    icon,
    color = "#aaa",
    size = 1,
    circle = true,
    className = "p-3",
}: {
    icon?: string;
    color?: string;
    size?: number;
    circle?: boolean;
    className?: string;
}) {
    const path =
        typeof icon !== "undefined"
            ? Icons[icon as IconType] ??
              CommonIcons[icon as keyof typeof CommonIcons] ??
              UnknownIcon
            : UnknownIcon;

    const style: CSSProperties = {};

    if (circle) {
        style.color = "#fff";
        style.backgroundColor = color;
        style.borderRadius = "50%";
    } else {
        style.color = color;
    }

    return (
        <div className={className} style={style}>
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
    card: mdiCreditCardCheckOutline,
    cash: mdiWallet,
};

export type IconType = keyof typeof Icons;

const CommonIcons = {
    plus: mdiPlus,
};

const UnknownIcon = mdiHelp;
