import CategoryExpenses from "../layouts/category/expenses";
import DashboardLayout from "../layouts/dashboard";
import Planning from "../layouts/planning";
import CategoryIncomes from "../layouts/category/incomes";

export default function Home() {
    return (
        <div
            className="grid gap-4"
            style={{
                backgroundColor: "#F2F7FC",
            }}
        >
            <div>
                <div className="h-4 bg-[#0084C8]" />
                <DashboardLayout />
            </div>
            <Planning />
            <CategoryExpenses />
            <CategoryIncomes />
        </div>
    );
}
