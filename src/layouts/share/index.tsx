import ShareHint from "./hint";
import ShareList from "./list";

export default function ShareLayout() {
    return (
        <div className="grid gap-3 py-3">
            <ShareHint />
            <ShareList />
        </div>
    );
}
