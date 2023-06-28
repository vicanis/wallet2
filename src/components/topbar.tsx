import { useMemo } from "react";
import { mdiCalendar, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "../lib/dayjs";

export default function TopBar() {
    const month = useMemo(() => {
        return dayjs().format("MMMM YYYY");
    }, []);

    return (
        <div className="flex justify-between px-10 py-4">
            <span className="flex justify-center items-center gap-2">
                <Icon
                    path={mdiCalendar}
                    size={1}
                    style={{ color: "#0A90D5" }}
                />
                <span className="text-sm">{month}</span>
            </span>

            <Icon path={mdiMenu} size={1} style={{ color: "#0A90D5" }} />
        </div>
    );
}
