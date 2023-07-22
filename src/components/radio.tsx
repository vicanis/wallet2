import { mdiRadioboxBlank, mdiRadioboxMarked } from "@mdi/js";
import Icon from "@mdi/react";

export default function Radio({
    name,
    selected,
}: Pick<RadioButton, "name" | "selected">) {
    return (
        <div className="flex justify-start items-center gap-2">
            <Icon
                path={selected ? mdiRadioboxMarked : mdiRadioboxBlank}
                size={1.5}
                color="#0084C8"
            />
            {typeof name !== "undefined" && <span>{name}</span>}
        </div>
    );
}

export interface RadioButton {
    id: string;
    name?: string;
    selected: boolean;
}
