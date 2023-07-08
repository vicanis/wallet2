import { WithId } from "mongodb";
import { Category } from "../../types/category";
import CategoryItem from "./item";

export default function CategoryList({ list }: { list: WithId<Category>[] }) {
    return (
        <div className="grid gap-4">
            {list.map((item, index) => (
                <CategoryItem key={index} {...item} />
            ))}
        </div>
    );
}
