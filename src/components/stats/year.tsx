import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function Year() {
    return (
        <div className="flex items-center gap-2">
            <Icon path={mdiCalendarMonthOutline} size={1.25} color="#0A90D5" />
            <span>2023</span>
        </div>
    );
}
