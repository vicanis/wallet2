import Amount from "../../../components/amount";
import CategoryIcon from "../../../components/category/icon";
import { PieChartItemData } from "../../../components/stats/piechart";

export default function CategoryBar({ item }: { item: PieChartItemData }) {
    return (
        <div className="flex items-center gap-3">
            <CategoryIcon category="auto" color={item.color} size={1.5} />

            <div className="w-full h-full my-auto">
                <div className="flex-grow flex justify-between">
                    <div className="flex-grow flex gap-3">{item.name}</div>

                    <span style={{ color: "#B49C98" }}>
                        <Amount
                            currency="RUB"
                            value={item.value}
                            iconSize={0.75}
                        />
                    </span>
                </div>

                <div className="flex gap-2 items-center">
                    <div className="text-sm color-[#B49C98] w-10 text-right">
                        {Math.floor(item.percent)}%
                    </div>
                    <div className="flex-grow w-full relative h-2">
                        <div
                            className="absolute w-full h-2 rounded-md"
                            style={{ backgroundColor: "#D3EAFF" }}
                        ></div>
                        <div
                            className="absolute h-2 rounded-md"
                            style={{
                                width: `${item.percent}%`,
                                backgroundColor: item.color,
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
