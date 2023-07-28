import { CurrencyType } from "../../types/currency";

export default function CurrencyFlag({
    currency,
    className = "h-6 w-6 flex items-center",
}: {
    currency: CurrencyType;
    className?: string;
}) {
    let country: string = "";

    switch (currency) {
        case "RUB":
            country = "ru";
            break;

        case "KZT":
            country = "kz";
            break;

        case "USD":
            country = "us";
            break;
    }

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
