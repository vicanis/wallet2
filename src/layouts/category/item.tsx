import { WithId } from "mongodb";
import { Category } from "../../types/category";
import { Link } from "react-router-dom";
import CategoryIcon from "../../components/category/icon";

export default function CategoryItem({
    _id,
    icon,
    color,
    name,
}: WithId<Category>) {
    return (
        <Link to={_id.toString()}>
            <div className="grid gap-3 justify-items-center">
                <CategoryIcon icon={icon} color={color} size={1.5} />
                <div>{name}</div>
            </div>
        </Link>
    );
}
