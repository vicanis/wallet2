import { useMemo } from "react";
import PieChartItem from "./item";

export default function PieChart({ items }: { items: PieChartItemData[] }) {
    const itemset = useMemo<Required<PieChartItemData>[]>(() => {
        const itemset: Required<PieChartItemData>[] = [];

        let start = 0;

        for (let i = 0; i < items.length; i++) {
            itemset.push({
                ...items[i],
                start,
            });
            start += items[i].percent;
        }

        return itemset;
    }, [items]);

    return (
        <div className="relative w-24 h-24">
            {itemset.map((item, index) => (
                <PieChartItem key={index} {...item} />
            ))}

            <div
                className="absolute w-24 h-24 bg-white"
                style={{
                    margin: "1em",
                    width: "4em",
                    height: "4em",
                    borderRadius: "50%",
                }}
            ></div>
        </div>
    );
}

export interface PieChartItemData {
    name: string;
    color: string;
    percent: number;
    start?: number;
}
