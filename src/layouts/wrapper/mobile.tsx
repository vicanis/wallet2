import { Fragment, ReactNode } from "react";
import ImagePhoneHand from "../../assets/phone_hand2.png";
import useMobile from "../../hooks/mobile";

export default function MobileWrapper({ children }: { children: ReactNode }) {
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
