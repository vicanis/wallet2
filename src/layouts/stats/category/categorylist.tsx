import { PieChartItemData } from "../../../components/stats/piechart";
import CategoryBar from "./bar";

export default function CategoryListLayout({
    items,
}: {
    items: PieChartItemData[];
}) {
    return (
        <div className="grid gap-4 px-4 mt-2">
            {items.map((item, index) => (
                <CategoryBar key={item.name} item={item} />
            ))}
        </div>
    );
}
