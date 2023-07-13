import { InputHTMLAttributes, ReactNode } from "react";
import Icon from "@mdi/react";
import { mdiCheckboxBlankOutline, mdiCheckboxMarked } from "@mdi/js";

export default function Checkbox({
    children,
    checked,
    onChange,
    ...rest
}: { children: ReactNode; onChange: (checked: boolean) => void } & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange"
>) {
    return (
        <div
            className="flex items-center gap-2 text-[#181717]"
            {...rest}
            onClick={() => {
                onChange(!checked);
            }}
        >
            <Icon
                path={checked ? mdiCheckboxMarked : mdiCheckboxBlankOutline}
                size={1.5}
            />
            {children}
        </div>
    );
}
