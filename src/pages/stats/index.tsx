import { Outlet } from "react-router-dom";
import NavTabs from "../../layouts/navtabs";
import ImageCategory from "../../assets/category.svg";
import ImageStatistics from "../../assets/statistics.svg";

export default function StatsPage() {
    return (
        <div style={{ backgroundColor: "#F2F7FC" }}>
            <NavTabs
                tabs={[
                    {
                        path: "category",
                        icon: ImageCategory,
                        name: "Категория",
                    },
                    {
                        path: "statistics",
                        icon: ImageStatistics,
                        name: "Статистика",
                    },
                ]}
            />
            <Outlet />
        </div>
    );
}
