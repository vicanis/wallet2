import { WithId } from "mongodb";
import { Category } from "../../types/category";
import Icon from "@mdi/react";
import { mdiHelpCircleOutline } from "@mdi/js";
import { Link } from "react-router-dom";

export default function CategoryItem({ _id, icon, name }: WithId<Category>) {
    return (
        <Link to={_id.toString()}>
            <div className="flex items-center justify-start gap-3">
                {typeof icon === "undefined" && (
                    <Icon path={mdiHelpCircleOutline} size={2} color="#aaa" />
                )}
                <div className="flex-grow">{name}</div>
            </div>
        </Link>
    );
}
