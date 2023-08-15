import { useMemo } from "react";

export default function RoundedAmount({
    value,
    digits = 2,
    strict = false,
}: {
    value: number;
    digits?: number;
    strict?: boolean;
}) {
    const rate = useMemo(() => RoundValue({ value, digits, strict }), [value]);

    return <span>{rate.toFixed(digits)}</span>;
}

export function RoundValue({
    value,
    digits = 2,
    strict = false,
}: {
    value: number;
    digits?: number;
    strict?: boolean;
}) {
    if (strict) {
        const mult = Math.pow(10, digits);
        const converted = Math.trunc(mult * value);

        return converted / mult;
    }

    // keep last N significant digits of the number

    const ord = Math.trunc(value);
    let frac = (value - Math.trunc(value)).toString().substring(2);

    let cnt = 0;
    let index = 0;

    for (; index < frac.length; index++) {
        const digit = frac[index];

        if (digit !== "0") {
            cnt++;
        }

        if (cnt === digits) {
            break;
        }
    }

    return ord + Number("0." + frac.substring(0, 1 + index));
}
