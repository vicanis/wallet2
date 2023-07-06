import { ReactNode } from "react";

export default function Overlay({
    children,
    onClick,
}: {
    children: ReactNode;
    onClick: () => void;
}) {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full backdrop-blur-md z-[1]"
            onClick={onClick}
        >
            <div
                className="absolute right-0 bg-[#0084C8] text-white h-screen w-[80%] rounded-l-xl"
                onClick={(event) => {
                    event.stopPropagation();
                }}
            >
                {children}
            </div>
        </div>
    );
}
