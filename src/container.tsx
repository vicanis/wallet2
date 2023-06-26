import { Fragment, ReactNode } from "react";
import ImagePhoneHand from "./phone_hand2.png";
import useMobile from "./mobile";

export default function Container({ children }: { children: ReactNode }) {
    const mobile = useMobile();

    if (!mobile) {
        return (
            <img
                src={ImagePhoneHand}
                className="mx-auto"
                style={{
                    height: "100vh",
                }}
            />
        );
    }

    return <Fragment>{children}</Fragment>;
}
