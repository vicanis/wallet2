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

        const total = initialItems.reduce((sum, item) => sum + item.value, 0);

        let start = 0;

        for (const { name, color, value } of initialItems) {
            const percent = (value / total) * 100;

            items.push({
                name,
                color,
                percent,
                start,
            });

            start += percent;
        }

        return items.sort((a, b) => {
            if (a.percent === b.percent) {
                return 0;
            }

            return a.percent > b.percent ? -1 : 1;
        });
    }, [initialItems]);

    return (
        <div className="grid grid-flow-col gap-6">
            <PieChart items={items} />
            <div className="grid gap-3">
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
