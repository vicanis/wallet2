import Pending from "../components/planning/pending";
import Remaining from "../components/planning/remaining";

export default function Planning() {
    return (
        <div className="grid gap-4 px-1">
            <Pending />
            <Remaining />
        </div>
    );
}
