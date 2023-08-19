import { useEffect, useState } from "react";
import Radio, { RadioButton } from "./radio";

export default function RadioGroup({
    items,
    onChange,
}: {
    items: RadioButton[];
    onChange?: (id: string) => void;
}) {
    const [selected, setSelected] = useState<string>(items[0].id);

    useEffect(() => {
        for (const item of items) {
            if (item.selected) {
                setSelected(item.id);
                return;
            }
        }
    }, [items]);

    return (
        <div className="flex gap-4 items-center justify-start">
            {items.map((item) => (
                <span
                    key={item.id}
                    onClick={() => {
                        if (typeof onChange === "function") {
                            onChange(item.id);
                        } else if (item.id !== selected) {
                            setSelected(item.id);
                        }
                    }}
                >
                    <Radio {...item} selected={item.id === selected} />
                </span>
            ))}
        </div>
    );
}
