import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Amount from "../amount";

export default function Pending() {
    return (
        <div
            className="flex justify-start items-center gap-4 py-3 px-4 rounded-2xl"
            style={{
                backgroundColor: "#B5CDD9",
            }}
        >
            <Icon
                path={mdiCalendarMonthOutline}
                size={1.5}
                style={{
                    backgroundColor: "#0084C8",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0.5em",
                }}
            />

            <div className="grid justify-start items-center gap-2">
                <span className="text-sm font-semibold">
                    3 предстоящих расхода
                </span>
                <Amount
                    currency="RUB"
                    value={90000}
                    iconSize={0.7}
                    style={{
                        fontSize: "11pt",
                    }}
                />
            </div>
        </div>
    );
}
