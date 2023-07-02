import { Outlet } from "react-router-dom";
import PeriodSelector from "../../components/stats/periodselector";

export default function CategoryLayout() {
    return (
        <div>
            <div className="px-5 py-2 border-2 rounded-2xl grid gap-2">
                <PeriodSelector />
                <Outlet />
            </div>
        </div>
    );
}
