import { useLocation, useNavigate } from "react-router-dom";
import ImageCategory from "../../assets/category.svg";
import ImageStatistics from "../../assets/statistics.svg";
import { useCallback } from "react";

export default function StatsTabs() {
    const navigate = useNavigate();

    const onSelect = useCallback(
        (tab: TabType) => {
            navigate(`/stats/${tab}`, { replace: true });
        },
        [navigate]
    );

    return (
        <div
            className="font-semibold text-white uppercase rounded-b-xl grid grid-cols-2 justify-items-center"
            style={{
                backgroundColor: "#0084C8",
            }}
        >
            <Item type="category" onSelect={onSelect} />
            <Item type="statistics" onSelect={onSelect} />
        </div>
    );
}

function Item({
    type,
    onSelect,
}: {
    type: TabType;
    onSelect?: (tab: TabType) => void;
}) {
    const location = useLocation();

    const selected =
        location.pathname.indexOf(`/stats/${type}`) === 0 ||
        (type === "category" && location.pathname === "/stats");

    const { icon, name } = Tabs[type];

    return (
        <div
            className={`grid gap-2 pb-4 ${!selected ? "opacity-50" : ""}`}
            onClick={() => {
                if (typeof onSelect === "function") {
                    onSelect(type);
                }
            }}
        >
            <img src={icon} className="mx-auto" />
            <div>{name}</div>
        </div>
    );
}

type TabType = "category" | "statistics";

interface Tab {
    icon: string;
    name: string;
    selected?: boolean;
    onSelect?: (tab?: TabType) => void;
}

const Tabs: {
    category: Tab;
    statistics: Tab;
} = {
    category: {
        icon: ImageCategory,
        name: "Категория",
    },
    statistics: {
        icon: ImageStatistics,
        name: "Статистика",
    },
};
