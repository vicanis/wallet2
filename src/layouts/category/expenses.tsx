import Expense from "../../components/category/expense";
import { Category } from "../../types/category";

const list: (Category & {
    value: number;
})[] = [
    {
        type: "expense",
        name: "Транспорт",
        icon: "auto",
        value: 3000,
        plan: {
            value: 2000,
        },
    },
    {
        type: "expense",
        name: "Покупки",
        icon: "grocery",
        value: 5000,
        plan: {
            value: 10000,
        },
    },
    {
        type: "expense",
        name: "Медицина",
        icon: "medical",
        value: 1000,
        plan: {
            value: 7000,
        },
    },
];

export default function CategoryExpenses() {
    return (
        <div>
            <div className="text-xs px-3 pb-2 pt-1 font-semibold">
                Расходы по категориям
            </div>

            <div className="grid gap-2 p-4 bg-white">
                {list.map((expense, index) => (
                    <Expense key={index} {...expense} />
                ))}
            </div>
        </div>
    );
}
