import { ReactNode } from "react";

export default function InputGroup({
    name,
    children,
}: {
    name: ReactNode;
    children: ReactNode;
}) {
    return (
        <div className="grid gap-1 w-full">
            <div className="pl-4 text-sm">{name}</div>
            <div className="px-4 py-5 border-2 border-sky-100 rounded-xl shadow-lg shadow-sky-100">
                {children}
            </div>
        </div>
    );
}
