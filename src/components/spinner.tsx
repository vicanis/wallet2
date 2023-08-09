import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

export default function Spinner({ size = 12 }: { size?: number }) {
    return (
        <div className={`animate-spin w-${size} h-${size} mx-auto`}>
            <Icon path={mdiLoading} size={size / 6} />
        </div>
    );
}
