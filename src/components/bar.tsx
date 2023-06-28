import { useMemo } from "react";

export default function Bar({ total, used }: { total: number; used: number }) {
    const percent = useMemo(() => {
        if (total === 0) {
            return 0;
        }

        return (100 * used) / total;
    }, [total, used]);

    return (
        <div className="relative h-4 rounded-xl w-full">
            <BarLine color="white" width={100} />
            {percent > 0 && <BarLine color="#0084C8" width={percent} />}
        </div>
    );
}

function BarLine({ color, width }: { color: string; width: number }) {
    return (
        <div
            className="absolute h-4 rounded-xl"
            style={{
                backgroundColor: color,
                width: `${width}%`,
                borderWidth: "1px",
                borderColor: "#AEB3B6",
            }}
        ></div>
    );
}
