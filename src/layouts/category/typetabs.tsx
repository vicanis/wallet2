import Tabs from "../../components/tabs";
import ImageArrowDown from "../../assets/arrow_down2.svg";
import ImageArrowUp from "../../assets/arrow_up2.svg";

export default function CategoryTypeTabs({
    selected,
    onSelect,
}: {
    selected: CategoryTabType;
    onSelect: (tab: CategoryTabType) => void;
}) {
    return (
        <Tabs
            tabs={[
                {
                    id: "expense",
                    icon: ImageArrowUp,
                    name: "Расход",
                },
                {
                    id: "income",
                    icon: ImageArrowDown,
                    name: "Доход",
                },
            ]}
            selected={selected}
            onSelect={(tab) => onSelect(tab.id as "expense" | "income")}
        />
    );
}

type CategoryTabType = "expense" | "income";
