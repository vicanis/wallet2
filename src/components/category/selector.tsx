import { mdiChevronRight, mdiGift } from "@mdi/js";
import Icon from "@mdi/react";

export default function CategorySelector() {
    return (
        <div className="flex gap-3 justify-between w-full">
            <Icon path={mdiGift} size={1} color="#1F93CE" />
            <span className="flex-grow">Подарки</span>
            <Icon path={mdiChevronRight} size={1} />
        </div>
    );
}
