import { CurrencyType } from "../../types/currency";

export default function CurrencyFlag({
    currency,
    className = "h-6 w-6 flex items-center",
}: {
    currency: CurrencyType;
    className?: string;
}) {
    const flags: {
        [code: string]: string;
    } = {
        AED: "ae",
        KGS: "kg",
        KZT: "kz",
        RUB: "ru",
        USD: "us",
    };

    const country = flags[currency] ?? "";

    return (
        <div className={className}>
            <span
                className={`fi fi-${country} fis`}
                style={{
                    width: "inherit",
                    height: "inherit",
                    borderRadius: "50%",
                }}
            ></span>
        </div>
    );
}

const Flags = {};
