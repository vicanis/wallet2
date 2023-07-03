import { useMemo } from "react";
import PieChart, { PieChartItemData } from "../../components/stats/piechart";

const initialItems: ItemData[] = [
    {
        name: "Прочее",
        value: 3000,
        color: "#E85338",
    },
    {
        name: "Покупки",
        value: 4800,
        color: "#31C587",
    },
    {
        name: "Транспорт",
        value: 1000,
        color: "#EADA47",
    },
    {
        name: "Медицина",
        value: 2500,
        color: "#4E85F0",
    },
    {
        name: "Кафе",
        value: 500,
        color: "#18e0f4",
    },
];

export default function PieChartLayout() {
    const items = useMemo<PieChartItemData[]>(() => {
        const items: PieChartItemData[] = [];

        const sorted: ItemData[] = initialItems.sort((a, b) => {
            if (a.value === b.value) {
                return 0;
            }

            return a.value > b.value ? -1 : 1;
        });

        const total = sorted.reduce((sum, item) => sum + item.value, 0);

        let start = 0;

        for (const { name, color, value } of sorted) {
            const percent = (value / total) * 100;

            items.push({
                name,
                color,
                percent,
                start,
                value,
            });

            start += percent;
        }

        return items;
    }, [initialItems]);

    return (
        <div className="flex items-start gap-6">
            <PieChart items={items} />
            <div className="flex-grow grid gap-3">
                {items.map((item, index) => (
                    <ListItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

function ListItem({ name, color, percent }: PieChartItemData) {
    return (
        <div className="flex gap-2 justify-between items-center">
            <div
                style={{
                    width: "1.25em",
                    height: "1.25em",
                    backgroundColor: color,
                    borderRadius: "50%",
                }}
            ></div>
            <div className="flex-grow">{name}</div>
            <div>{Math.floor(percent)}%</div>
        </div>
    );
}

interface ItemData {
    name: string;
    value: number;
    color: string;
}
