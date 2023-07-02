import { useLocation, useNavigate } from "react-router-dom";

export default function PeriodSelector() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const parts = pathname.split("/");
    const tab = parts?.[3] ?? "expense";

    return (
        <div className="flex justify-between items-center">
            <Item
                name="год"
                selected={pathname.indexOf(`/stats/category/${tab}/year`) === 0}
                onSelect={() => navigate(`/stats/category/${tab}/year`)}
            />
            <Item
                name="месяц"
                selected={
                    pathname === "/stats" ||
                    pathname === "/stats/category" ||
                    pathname === `/stats/category/${tab}` ||
                    pathname.indexOf(`/stats/category/${tab}/month`) === 0
                }
                onSelect={() => navigate(`/stats/category/${tab}/month`)}
            />
            <Item
                name="неделя"
                selected={pathname.indexOf(`/stats/category/${tab}/week`) === 0}
                onSelect={() => navigate(`/stats/category/${tab}/week`)}
            />
            <Item
                name="день"
                selected={pathname.indexOf(`/stats/category/${tab}/day`) === 0}
                onSelect={() => navigate(`/stats/category/${tab}/day`)}
            />
        </div>
    );
}

function Item({
    name,
    selected,
    onSelect,
}: {
    name: string;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <div
            className={`text-sm px-1 border-b-2`}
            style={{
                color: selected ? "#18A3F4" : "",
                borderColor: selected ? "#18A3F4" : "transparent",
            }}
            onClick={() => onSelect()}
        >
            {name}
        </div>
    );
}
