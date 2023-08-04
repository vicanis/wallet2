import dayjs from "../lib/dayjs";
import type { HistoryItem, HistoryGroup } from "../types/history";
import Amount from "../components/amount";
import CategoryIcon from "../components/category/icon";

export default function HistoryLayout({ list }: { list: HistoryGroup[] }) {
    return (
        <div className="py-2 grid gap-4 pt-4">
            {list.map((group, index) => (
                <Group key={index} {...group} />
            ))}
        </div>
    );
}

function Group({ date, items }: HistoryGroup) {
    return (
        <div>
            <div className="flex items-center justify-between px-4">
                {dayjs(date).format("DD MMMM, dddd")}
            </div>
            <hr className="my-1" />
            <div className="grid gap-2 mt-2 px-4">
                {items.map((item, index) => (
                    <Item key={index} {...item} />
                ))}
            </div>
        </div>
    );
}

function Item({ category, amount, wallet }: HistoryItem) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
                <CategoryIcon icon={category.icon} color={category.color} />
                <div className="flex-grow">{category.name}</div>
            </div>
            <div className="flex flex-col items-end">
                <Amount {...amount} iconSize={0.7} />
                <div className="text-sm">{wallet.name}</div>
            </div>
        </div>
    );
}
