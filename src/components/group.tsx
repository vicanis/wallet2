import { ReactNode } from "react";

export default function InputGroup({
    name,
    children,
    py = "py-5",
}: {
    name: ReactNode;
    children: ReactNode;
    py?: string;
}) {
    return (
        <div className="grid gap-1 w-full">
            <div className="pl-4 text-sm">{name}</div>
            <div
                className={`px-4 ${py} border-2 border-sky-100 rounded-xl shadow-lg shadow-sky-100`}
            >
                {children}
            </div>
        </div>
    );
}
