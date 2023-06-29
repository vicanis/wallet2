import Expense, { CategoryExpense } from "../../components/category/expense";

const list: CategoryExpense[] = [
    {
        name: "Транспорт",
        icon: "auto",
        value: 3000,
        limit: 2000,
    },
    {
        name: "Покупки",
        icon: "grocery",
        value: 5000,
        limit: 10000,
    },
    {
        name: "Медицина",
        icon: "medical",
        value: 1000,
        limit: 7000,
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
