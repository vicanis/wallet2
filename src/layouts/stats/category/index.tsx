import { Fragment, useMemo } from "react";
import PeriodSelector from "../../../components/stats/periodselector";
import PieChartLayout from "./piechart";
import CategoryListLayout from "./categorylist";
import { PieChartItemData } from "../../../components/stats/piechart";

const items: ItemData[] = [
    {
        name: "Прочее",
        value: 3000,
        color: "#E85338",
        icon: "none",
    },
    {
        name: "Покупки",
        value: 4800,
        color: "#31C587",
        icon: "none",
    },
    {
        name: "Транспорт",
        value: 1000,
        color: "#EADA47",
        icon: "none",
    },
    {
        name: "Медицина",
        value: 2500,
        color: "#4E85F0",
        icon: "none",
    },
    {
        name: "Кафе",
        value: 500,
        color: "#18e0f4",
        icon: "none",
    },
];

export default function CategoryLayout() {
    const chartItems = useMemo<PieChartItemData[]>(() => {
        const chartItems: PieChartItemData[] = [];

        items.sort((a, b) => {
            if (a.value === b.value) {
                return 0;
            }

            return a.value > b.value ? -1 : 1;
        });

        const total = items.reduce((sum, item) => sum + item.value, 0);

        let start = 0;

        for (const { name, color, value } of items) {
            const percent = (value / total) * 100;

            chartItems.push({
                name,
                color,
                percent,
                start,
                value,
            });

            start += percent;
        }

        return chartItems;
    }, [items]);

    return (
        <Fragment>
            <div
                className="px-5 pt-3 pb-5 grid gap-2 bg-white"
                style={{
                    borderRadius: "0.9375rem",
                    boxShadow: "4px 4px 20px 0px rgba(0, 132, 200, 0.30)",
                }}
            >
                <PeriodSelector />
                <PieChartLayout items={chartItems} />
            </div>

            <CategoryListLayout items={chartItems} />
        </Fragment>
    );
}

export interface ItemData {
    name: string;
    value: number;
    color: string;
    icon: string;
}
