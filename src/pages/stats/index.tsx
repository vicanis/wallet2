import { Outlet } from "react-router-dom";
import StatsTabs from "../../layouts/stats/tabs";

export default function StatsPage() {
    return (
        <div style={{ backgroundColor: "#F2F7FC" }}>
            <StatsTabs />
            <Outlet />
        </div>
    );
}
