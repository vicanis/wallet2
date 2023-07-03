import PieChartItem from "./item";

export default function PieChart({ items }: { items: PieChartItemData[] }) {
    return (
        <div className="relative aspect-square">
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
        </div>
    );
}

export interface PieChartItemData {
    name: string;
    color: string;
    percent: number;
    start: number;
}
