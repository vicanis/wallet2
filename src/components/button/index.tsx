import { ReactNode } from "react";

export default function Button({
    onClick,
    children,
}: {
    onClick?: () => void;
    children: ReactNode;
}) {
    return (
        <div
            className="w-max mx-auto font-semibold"
            style={{
                color: "#1F93CE",
            }}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
