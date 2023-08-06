import { ReactNode } from "react";
import Blur from "./blur";

export default function Warning({
    children,
    ...rest
}: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Blur {...rest}>
            <div className="h-screen w-screen flex items-center justify-center">
                <div
                    className="p-4 grid gap-4 justify-center text-center bg-white w-3/4"
                    style={{
                        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    {children}
                </div>
            </div>
        </Blur>
    );
}
