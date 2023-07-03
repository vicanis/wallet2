import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "../../lib/dayjs";

export default function PeriodSelector() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const parts = pathname.split("/");
    const tab = parts?.[3] ?? "expense";

    const selectedPeriod = useMemo<"year" | "month" | "week" | "day">(() => {
        if (pathname.indexOf(`/stats/category/${tab}/year`) === 0) {
            return "year";
        }

        if (pathname.indexOf(`/stats/category/${tab}/week`) === 0) {
            return "week";
        }

        if (pathname.indexOf(`/stats/category/${tab}/day`) === 0) {
            return "day";
        }

        return "month";
    }, [pathname, tab]);

    const periodRange = useMemo(() => {
        switch (selectedPeriod) {
            case "year":
                return dayjs().format("YYYY");

            case "month":
                return dayjs().format("MMMM YYYY");

            case "week":
                const weekStart = dayjs().startOf("week");
                const weekEnd = dayjs().endOf("week");
                return (
                    weekStart.format("DD MMMM YYYY") +
                    " - " +
                    weekEnd.format("DD MMMM YYYY")
                );
        }

        return dayjs().format("DD MMMM YYYY");
    }, [selectedPeriod]);

    return (
        <div>
            <div className="flex justify-between items-center">
                <Item
                    name="год"
                    selected={selectedPeriod === "year"}
                    onSelect={() => navigate(`/stats/category/${tab}/year`)}
                />
                <Item
                    name="месяц"
                    selected={selectedPeriod === "month"}
                    onSelect={() => navigate(`/stats/category/${tab}/month`)}
                />
                <Item
                    name="неделя"
                    selected={selectedPeriod === "week"}
                    onSelect={() => navigate(`/stats/category/${tab}/week`)}
                />
                <Item
                    name="день"
                    selected={selectedPeriod === "day"}
                    onSelect={() => navigate(`/stats/category/${tab}/day`)}
                />
            </div>
            <div className="text-center py-3">{periodRange}</div>
        </div>
    );
}

function Item({
    name,
    selected,
    onSelect,
}: {
    name: string;
    selected: boolean;
    onSelect: () => void;
}) {
    return (
        <div
            className={`text-sm px-1 border-b-2`}
            style={{
                color: selected ? "#18A3F4" : "#918282",
                borderColor: selected ? "#18A3F4" : "transparent",
            }}
            onClick={() => onSelect()}
        >
            {name}
        </div>
    );
}
