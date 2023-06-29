import Amount from "../amount";
import Bar from "../bar";
import CategoryIcon, { CategoryIncomeIconType } from "./icon";

export default function Income({ name, icon, value, limit }: CategoryIncome) {
    const remains = limit - value;

    return (
        <div className="flex items-center gap-2">
            <CategoryIcon category={icon} color="#0084C8" />

            <div className="w-full grid gap-1">
                <div className="flex justify-between items-center">
                    <div className="text-xs">{name}</div>
                    <Amount
                        currency="RUB"
                        value={value}
                        iconSize={0.5}
                        style={{ fontSize: "8pt", fontWeight: 500 }}
                    />
                </div>

                <div className="flex justify-between items-center gap-4">
                    <Bar
                        total={limit}
                        used={Math.min(limit, value)}
                        size="small"
                        color={"#B5CDD9"}
                        background="#D3EAFF"
                        border={false}
                    />

                    <span
                        className="flex gap-1 text-xs"
                        style={{
                            color: "#BFB7B7",
                        }}
                    >
                        <span>осталось</span>
                        <Amount
                            currency="RUB"
                            value={Math.abs(remains)}
                            iconSize={0.5}
                            style={{ fontSize: "8pt", fontWeight: 500 }}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
}

export interface CategoryIncome {
    name: string;
    icon: CategoryIncomeIconType;
    value: number;
    limit: number;
}
