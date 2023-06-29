import {
    mdiBottleTonicPlus,
    mdiCarHatchback,
    mdiCart,
    mdiCashMultiple,
    mdiCreditCardMultiple,
} from "@mdi/js";
import Icon from "@mdi/react";

export default function CategoryIcon({
    category,
    color,
}: {
    category: CategoryExpenseIconType | CategoryIncomeIconType;
    color: string;
}) {
    switch (category) {
        case "auto":
        case "grocery":
        case "medical":
            return (
                <div
                    className="p-1"
                    style={{
                        color: "#fff",
                        backgroundColor: color,
                        borderRadius: "50%",
                    }}
                >
                    <Icon path={ExpenseIcons[category]} size={1} />
                </div>
            );

        case "cash":
        case "card":
            return (
                <div
                    className="p-1"
                    style={{
                        color: "#fff",
                        backgroundColor: color,
                        borderRadius: "50%",
                    }}
                >
                    <Icon path={IncomeIcons[category]} size={1} />
                </div>
            );
    }

    return <div>{category}</div>;
}

const ExpenseIcons = {
    auto: mdiCarHatchback,
    grocery: mdiCart,
    medical: mdiBottleTonicPlus,
};

export type CategoryExpenseIconType = keyof typeof ExpenseIcons;

const IncomeIcons = {
    cash: mdiCashMultiple,
    card: mdiCreditCardMultiple,
};

export type CategoryIncomeIconType = keyof typeof IncomeIcons;
