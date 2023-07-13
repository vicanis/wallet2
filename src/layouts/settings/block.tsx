import { ReactNode } from "react";

export default function SettingsBlock({
    title,
    children,
}: {
    title?: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-3">
            {typeof title !== "undefined" && (
                <div className="text-[#8A8181] text-sm">{title}</div>
            )}
            {children}
        </div>
    );
}
