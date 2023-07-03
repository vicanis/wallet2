import PeriodSelector from "../../components/stats/periodselector";
import Switcher from "../../components/stats/switcher";
import CategoryListLayout from "../../layouts/stats/categorylist";
import PieChartLayout from "../../layouts/stats/piechart";

export default function CategoryPage() {
    return (
        <div className="py-4 grid gap-4">
            <div className="mx-auto">
                <Switcher />
            </div>

            <div className="px-5 py-2 rounded-2xl grid gap-2 bg-white">
                <PeriodSelector />
                <PieChartLayout />
            </div>

            <CategoryListLayout />
        </div>
    );
}
