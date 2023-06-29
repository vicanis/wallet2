import TopBar from "../components/topbar";
import CategoryExpenses from "../layouts/category/expenses";
import Dashboard from "../layouts/dashboard";
import Planning from "../layouts/planning";

export default function Home() {
    return (
        <div
            className="grid gap-4 pt-4"
            style={{
                backgroundColor: "#F2F7FC",
            }}
        >
            <TopBar />
            <Dashboard />
            <Planning />
            <CategoryExpenses />
        </div>
    );
}
