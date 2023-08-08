import { Invitation } from "../../types/invitation";
import ShareHint from "./hint";
import ShareList from "./list";

export default function ShareLayout({
    invitation,
}: {
    invitation: Invitation;
}) {
    return (
        <div className="grid gap-3 py-3">
            <ShareHint />
            <ShareList invitation={invitation} />
        </div>
    );
}
