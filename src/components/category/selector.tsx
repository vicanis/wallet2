import { useEffect, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import { Category } from "../../types/category";
import BlurredSelector from "../blurredselector";
import CategoryIcon from "./icon";
import Radio from "../radio";

export default function CategorySelector({
    type,
    ...props
}: {
    type: "expense" | "income";
    selected?: ObjectId;
    onChange: (id: ObjectId) => void;
}) {
    const [categories, setCategories] = useState<WithId<Category>[]>();

    useEffect(() => {
        fetch("/.netlify/functions/get_categories")
            .then((resp) => resp.json())
            .then((list: WithId<Category>[]) =>
                setCategories(list.filter((item) => item.type === type))
            );
    }, [type]);

    return (
        <BlurredSelector
            header={<div className="text-sm">Выберите категорию ...</div>}
            items={categories}
            renderer={(arg) =>
                arg.picker ? (
                    <div className="flex items-center gap-3">
                        <Radio selected={arg.selected} />
                        <div className="w-full">
                            <Item {...arg.item} picker />
                        </div>
                    </div>
                ) : (
                    <Item {...arg.item} />
                )
            }
            {...props}
        />
    );
}

function Item({
    name,
    color,
    icon,
    picker = false,
}: Category & {
    picker?: boolean;
}) {
    return (
        <div className="flex gap-3 items-center justify-between w-full">
            <CategoryIcon icon={icon} color={color} />
            <span className="flex-grow">{name}</span>
            {!picker && <Icon path={mdiChevronRight} size={1} />}
        </div>
    );
}
