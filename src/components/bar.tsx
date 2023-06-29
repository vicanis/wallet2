import { useMemo } from "react";

export default function Bar({
    total,
    used,
    size,
    color = "#0084C8",
    background = "white",
    border = true,
}: {
    total: number;
    used: number;
    size: Size;
    color?: string;
    background?: string;
    border?: boolean;
}) {
    const percent = useMemo(() => {
        if (total === 0) {
            return 0;
        }

        return (100 * used) / total;
    }, [total, used]);

    return (
        <div
            className={`relative ${
                size === "small" ? "h-2" : "h-4"
            } rounded-xl w-full`}
        >
            <BarLine
                color={background}
                width={100}
                size={size}
                border={border}
            />
            {percent > 0 && (
                <BarLine
                    color={color}
                    width={percent}
                    size={size}
                    border={border}
                />
            )}
        </div>
    );
}

function BarLine({
    color,
    width,
    size,
    border,
}: {
    color: string;
    width: number;
    size: Size;
    border: boolean;
}) {
    return (
        <div
            className={`absolute ${
                size === "small" ? "h-2" : "h-4"
            } rounded-xl`}
            style={{
                backgroundColor: color,
                width: `${width}%`,
                borderWidth: border ? "1px" : "0",
                borderColor: "#AEB3B6",
            }}
        ></div>
    );
}

type Size = "small" | "medium";
