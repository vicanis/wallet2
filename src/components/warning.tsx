import { ReactNode } from "react";
import Blur from "./blur";
import BoxShadow from "../layouts/boxshadow";

export default function Warning({
    children,
    ...rest
}: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <Blur {...rest}>
            <div className="h-screen w-screen flex items-center justify-center">
                <BoxShadow>
                    <div className="text-center">{children}</div>
                </BoxShadow>
            </div>
        </Blur>
    );
}
