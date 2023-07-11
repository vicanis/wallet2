import Icon from "@mdi/react";
import CategoryIcon, { IconType, Icons } from ".";
import { mdiDotsHorizontalCircleOutline } from "@mdi/js";

export default function IconSelector({
    type,
    color,
    selected,
    onSelect,
}: {
    type: "expense" | "income";
    color: string;
    selected: string;
    onSelect: (icon: string) => void;
}) {
    const isIncome = (key: string) => ["cash", "card"].indexOf(key) !== -1;

    const keys = Object.keys(Icons).filter((key) =>
        type === "income" ? isIncome(key) : !isIncome(key)
    ) as IconType[];

    return (
        <div className="grid grid-cols-4 gap-y-3">
            {keys.map((key) => (
                <span
                    key={key}
                    className={`m-auto ${key === selected ? "" : "p-2"}`}
                    onClick={() => onSelect(key)}
                >
                    <CategoryIcon
                        icon={Icons[key]}
                        color={key === selected ? color : `${color}88`}
                        size={key === selected ? 2.5 : 2}
                    />
                </span>
            ))}

            <Icon
                path={mdiDotsHorizontalCircleOutline}
                size={3}
                className="m-auto"
            />
        </div>
    );
}
