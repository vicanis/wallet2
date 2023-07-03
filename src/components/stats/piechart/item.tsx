import { PieChartItemData } from ".";

export default function PieChartItem({
    color,
    percent,
    start,
}: Required<PieChartItemData>) {
    return (
        <div
            className="absolute w-full h-full"
            style={{
                borderRadius: "50%",
                background: `conic-gradient(${color} calc(${percent}%), #0000 0)`,
                transform: `rotate(${start * 3.6}deg)`,
            }}
        ></div>
    );
}
