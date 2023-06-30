import TopBar from "../components/topbar";
import CategoryExpenses from "../layouts/category/expenses";
import Dashboard from "../layouts/dashboard";
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
            <div className="grid sticky top-0 w-full z-10">
                <TopBar />
                <Dashboard />
            </div>

            <Planning />

            <CategoryExpenses />
            <CategoryIncomes />
        </div>
    );
}
