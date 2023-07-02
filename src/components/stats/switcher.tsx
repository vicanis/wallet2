import { useLocation, useNavigate } from "react-router-dom";

export default function Switcher() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <div className="flex gap-8 justify-center">
            <Item
                name="Расход"
                checked={
                    pathname === "/stats" ||
                    pathname === "/stats/category" ||
                    pathname === "/stats/category/expense"
                }
                onSelect={() => navigate("/stats/category/expense")}
            />
            <Item
                name="Доход"
                checked={pathname === "/stats/category/income"}
                onSelect={() => navigate("/stats/category/income")}
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
