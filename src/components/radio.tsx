import { mdiRadioboxBlank, mdiRadioboxMarked } from "@mdi/js";
import Icon from "@mdi/react";

export default function Radio({ name, selected }: RadioButton) {
    return (
        <div className="flex justify-start items-center gap-2">
            <Icon
                path={selected ? mdiRadioboxMarked : mdiRadioboxBlank}
                size={1.5}
                color="#0084C8"
            />
            <span>{name}</span>
        </div>
    );
}

export interface RadioButton {
    id: string;
    name: string;
    selected: boolean;
}
