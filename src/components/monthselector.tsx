import { useMemo } from "react";
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import dayjs from "../lib/dayjs";

export default function MonthSelector() {
    const month = useMemo(() => {
        return dayjs().format("MMMM YYYY");
    }, []);

    return (
        <span className="flex justify-center items-center gap-2">
            <Icon
                path={mdiCalendarMonthOutline}
                size={1}
                style={{ color: "#0A90D5" }}
            />
            <span className="text-sm text-black">{month}</span>
        </span>
    );
}
