import Icon from "@mdi/react";
import Amount from "../../../components/amount";
import { mdiArrowDownCircle, mdiArrowUpCircle } from "@mdi/js";

const data: CashFlowData = {
    income: 500000,
    expense: 300000,
};

export default function CashFlow() {
    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between">
                <div>Cash Flow</div>
                <a className="text-[#18A3F4] font-medium">Подробнее</a>
            </div>

            <Item type="income" value={data.income} />
            <Item type="expense" value={data.expense} />

            <hr
                className="border-[#C1C5C9]"
                style={{ borderTopWidth: "3px" }}
            />

            <Item type="balance" value={data.income - data.expense} />
        </div>
    );
}

function Item({
    type,
    value,
}: {
    type: "income" | "expense" | "balance";
    value: number;
}) {
    const colorRed = "#E85338";
    const colorGreen = "#72B805";

    const color =
        type === "balance"
            ? value > 0
                ? colorGreen
                : colorRed
            : type === "income"
            ? colorGreen
            : colorRed;

    return (
        <div
            className="grid items-center gap-2"
            style={{ gridTemplateColumns: "2.5em 1fr auto" }}
        >
            <div className="">
                {type !== "balance" ? (
                    <Icon
                        path={
                            type === "income"
                                ? mdiArrowDownCircle
                                : mdiArrowUpCircle
                        }
                        size={1.5}
                        color={color}
                    />
                ) : (
                    <div />
                )}
            </div>

            <span className="flex-grow">
                {type === "balance"
                    ? "Остаток"
                    : type === "income"
                    ? "Доход"
                    : "Расход"}
            </span>

            <Amount
                currency="RUB"
                value={value}
                iconSize={0.75}
                style={{
                    color,
                    fontWeight: 600,
                }}
            />
        </div>
    );
}

interface CashFlowData {
    income: number;
    expense: number;
}
