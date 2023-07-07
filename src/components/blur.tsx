import { ReactNode } from "react";

export default function Blur({
    children,
    ...props
}: { children?: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full backdrop-blur-md z-10"
            {...props}
        >
            {children}
        </div>
    );
}
