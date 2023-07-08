import { useLocation, Link } from "react-router-dom";

export default function NavTabs({ tabs }: { tabs: Tab[] }) {
    return (
        <div
            className="font-semibold text-white uppercase rounded-b-xl grid grid-cols-2 justify-items-center"
            style={{
                backgroundColor: "#0084C8",
            }}
        >
            {tabs.map((tab) => (
                <Link key={tab.path} to={`/stats/${tab.path}`}>
                    <Item {...tab} />
                </Link>
            ))}
        </div>
    );
}

function Item({ icon, name, path }: Tab) {
    const location = useLocation();

    const selected =
        location.pathname.indexOf(`/stats/${path}`) === 0 ||
        (path === "category" && location.pathname === "/stats");

    return (
        <div className={`grid gap-2 pb-4 ${!selected ? "opacity-50" : ""}`}>
            <img src={icon} className="mx-auto" />
            <div>{name}</div>
        </div>
    );
}

export interface Tab {
    path: string;
    icon: string;
    name: string;
    selected?: boolean;
    onSelect?: (tab?: string) => void;
}
