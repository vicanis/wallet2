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
            <div className="flex items-center justify-start gap-3">
                <CategoryIcon icon={icon} color={color} size={1.5} />
                <div className="flex-grow">{name}</div>
            </div>
        </Link>
    );
}
