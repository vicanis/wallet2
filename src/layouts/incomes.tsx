import Income, { CategoryIncome } from "../components/category/income";

const list: CategoryIncome[] = [
    {
        name: "Зарплата",
        icon: "card",
        value: 50000,
        limit: 70000,
    },
    {
        name: "Аванс",
        icon: "cash",
        value: 20000,
        limit: 5000,
    },
];

export default function CategoryIncomes() {
    return (
        <div>
            <div className="text-xs px-3 pb-2 pt-1 font-semibold">Доходы</div>

            <div className="grid gap-2 p-4 bg-white">
                {list.map((expense, index) => (
                    <Income key={index} {...expense} />
                ))}
            </div>
        </div>
    );
}
