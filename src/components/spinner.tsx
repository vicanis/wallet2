import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default function Spinner() {
    return (
        <div className="animate-spin w-12 h-12 mx-auto">
            <Icon path={mdiLoading} size={2} />
        </div>
    );
}
