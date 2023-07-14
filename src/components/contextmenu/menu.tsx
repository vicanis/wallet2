import { ReactNode, useLayoutEffect, useState } from "react";

export default function ContextMenu({
    position,
    children,
}: {
    position: { x: number; y: number };
    children: ReactNode;
}) {
    const [style, setStyle] = useState<React.CSSProperties>({
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
    });

    useLayoutEffect(() => {
        const { innerHeight: height, innerWidth: width } = window;

        if (width - position.x < 200) {
            setStyle((style) => ({
                ...style,
                right: "1em",
            }));
        } else {
            setStyle((style) => ({
                ...style,
                left: position.x,
            }));
        }

        if (height - position.y < 100) {
            setStyle((style) => ({
                ...style,
                bottom: "1em",
            }));
        } else {
            setStyle((style) => ({
                ...style,
                top: position.y,
            }));
        }
    }, [position]);

    return (
        <div
            className="absolute bg-[#f8f8f8] z-20 w-max p-4 grid gap-3 mt-2"
            style={style}
        >
            {children}
        </div>
    );
}
