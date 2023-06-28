import TopBar from "../components/topbar";
import Dashboard from "../layouts/dashboard";
import Planning from "../layouts/planning";

export default function Home() {
    return (
        <div className="grid gap-4 pt-4">
            <TopBar />
            <Dashboard />
            <Planning />
        </div>
    );
}
