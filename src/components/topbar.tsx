import { useMemo } from "react";
import { mdiCalendar, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "../lib/dayjs";
import AuthButton from "./auth/button";

export default function TopBar() {
    const month = useMemo(() => {
        return dayjs().format("MMMM YYYY");
    }, []);

    return (
        <div className="py-4 flex justify-between px-10 bg-white">
            <span className="flex justify-center items-center gap-2">
                <Icon
                    path={mdiCalendar}
                    size={1}
                    style={{ color: "#0A90D5" }}
                />
                <span className="text-sm">{month}</span>
            </span>

            <AuthButton />

            <Icon path={mdiMenu} size={1} style={{ color: "#0A90D5" }} />
        </div>
    );
}
