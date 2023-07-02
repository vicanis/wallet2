import { useLocation, useNavigate } from "react-router-dom";

export default function Switcher() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const parts = pathname.split("/");
    const period = parts?.[4] ?? "month";

    return (
        <div className="flex gap-8 justify-center">
            <Item
                name="Расход"
                checked={
                    pathname === "/stats" ||
                    pathname === "/stats/category" ||
                    pathname.indexOf("/stats/category/expense") === 0
                }
                onSelect={() => navigate(`/stats/category/expense/${period}`)}
            />
            <Item
                name="Доход"
                checked={pathname.indexOf("/stats/category/income") === 0}
                onSelect={() => navigate(`/stats/category/income/${period}`)}
            />
        </div>
    );
}

function Item({
    name,
    checked,
    onSelect,
}: {
    name: string;
    checked: boolean;
    onSelect: () => void;
}) {
    return (
        <div
            className="py-1 px-3 rounded-2xl text-white"
            style={{
                backgroundColor: checked ? "#18A3F4" : "#9A9A9A",
                fontWeight: 500,
            }}
            onClick={() => onSelect()}
        >
            {name}
        </div>
    );
}
