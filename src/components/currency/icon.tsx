import { IconProps } from "@mdi/react/dist/IconProps";
import { CurrencyType } from "../../types/currency";
import { mdiCurrencyKzt, mdiCurrencyRub, mdiCurrencyUsd } from "@mdi/js";
import Icon from "@mdi/react";

export function CurrencyIcon({
    type,
    ...props
}: {
    type: CurrencyType;
} & Omit<IconProps, "path">) {
    let svg: string = "";

    switch (type) {
        case "RUB":
            svg = mdiCurrencyRub;
            break;

        case "KZT":
            svg = mdiCurrencyKzt;
            break;

        case "USD":
            svg = mdiCurrencyUsd;
            break;
    }

    if (svg === "") {
        return <span>{type}</span>;
    }

    return <Icon size={1} {...props} path={svg} />;
}
