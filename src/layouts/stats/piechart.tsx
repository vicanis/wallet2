import PieChart, { PieChartItemData } from "../../components/stats/piechart";

const items: PieChartItemData[] = [
    {
        name: "Прочее",
        percent: 30,
        color: "#E85338",
    },
    {
        name: "Покупки",
        percent: 30,
        color: "#31C587",
    },
    {
        name: "Транспорт",
        percent: 10,
        color: "#EADA47",
    },
    {
        name: "Медицина",
        percent: 20,
        color: "#4E85F0",
    },
];

export default function PieChartLayout() {
    return (
        <div className="grid grid-flow-col">
            <div className="w-8">
                <PieChart items={items} />
            </div>
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
