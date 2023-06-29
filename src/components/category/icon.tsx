import { mdiBottleTonicPlus, mdiCarHatchback, mdiCart } from "@mdi/js";
import Icon from "@mdi/react";

export default function CategoryIcon({
    category,
    color,
}: {
    category: CategoryIconType;
    color: string;
}) {
    switch (category) {
        case "auto":
        case "grocery":
        case "medical":
            return (
                <div
                    className="p-1"
                    style={{
                        color: "#fff",
                        backgroundColor: color,
                        borderRadius: "50%",
                    }}
                >
                    <Icon path={Icons[category]} size={1} />
                </div>
            );
    }

    return <div>{category}</div>;
}

const Icons = {
    auto: mdiCarHatchback,
    grocery: mdiCart,
    medical: mdiBottleTonicPlus,
};

export type CategoryIconType = keyof typeof Icons;
