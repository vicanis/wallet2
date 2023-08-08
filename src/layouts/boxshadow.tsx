import { ReactNode } from "react";

export default function BoxShadow({ children }: { children: ReactNode }) {
    return (
        <div
            className="p-4 bg-white w-3/4"
            style={{
                boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
            }}
        >
            {children}
        </div>
    );
}
