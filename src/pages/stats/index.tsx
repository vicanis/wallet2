import { Outlet } from "react-router-dom";
import StatsTabs from "../../layouts/stats/tabs";

export default function StatsPage() {
    return (
        <div>
            <StatsTabs />
            <Outlet />
        </div>
    );
}
