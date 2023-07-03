import { useMemo } from "react";
import PieChartItem from "./item";

export default function PieChart({ items }: { items: PieChartItemData[] }) {
    const sum = useMemo(() => {
        return items.reduce((sum, item) => sum + item.value, 0);
    }, [items]);

    return (
        <div className="relative aspect-square w-32">
            {items.map((item, index) => (
                <PieChartItem key={index} {...item} />
            ))}
            <div
                className="absolute aspect-square bg-white"
                style={{
                    margin: "1em",
                    width: "calc(100% - 2em)",
                    height: "calc(100% - 2em)",
                    borderRadius: "50%",
                }}
            ></div>
            <div className="absolute w-full h-full flex gap-1 flex-col items-center justify-center font-medium">
                <div className="text-sm">
                    <div>Общий</div>
                    <div>расход</div>
                </div>
                <div>{Math.floor(sum)}</div>
            </div>
        </div>
    );
}

export interface PieChartItemData {
    name: string;
    color: string;
    value: number;
    percent: number;
    start: number;
}
