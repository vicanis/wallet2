import PieChart, { PieChartItemData } from "../../../components/stats/piechart";

export default function PieChartLayout({
    items,
}: {
    items: PieChartItemData[];
}) {
    return (
        <div className="flex items-start gap-6">
            <PieChart items={items} />

            <div className="flex-grow grid gap-3">
                {items.map((item, index) => (
                    <ListItem key={item.name} {...item} />
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
