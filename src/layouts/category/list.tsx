import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WithId } from "mongodb";
import { Category } from "../../types/category";
import Button from "../../components/button";
import CategoryItem from "./item";
import CategoryTypeTabs from "./typetabs";

export default function CategoryList({
    list: fullList,
}: {
    list: WithId<Category>[];
}) {
    const [type, setType] = useState<"expense" | "income">("expense");

    const list = useMemo(() => {
        return fullList.filter((item) => item.type === type);
    }, [fullList, type]);

    return (
        <div className="grid gap-4">
            <CategoryTypeTabs selected={type} onSelect={setType} />

            <div className="px-4 grid gap-4 pt-2">
                <Link to="new">
                    <Button>Создать категорию</Button>
                </Link>

                {list.length > 0 ? (
                    list.map((item, index) => (
                        <CategoryItem key={index} {...item} />
                    ))
                ) : (
                    <div className="text-[#808080]">Не найдено</div>
                )}
            </div>
        </div>
    );
}
