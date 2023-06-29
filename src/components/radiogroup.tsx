import { useState } from "react";
import Radio, { RadioButton } from "./radio";

export default function RadioGroup({ items }: { items: RadioButton[] }) {
    const [selected, setSelected] = useState<string>(() => {
        return items[0].id;
    });

    return (
        <div className="flex gap-4 items-center justify-start">
            {items.map((item) => (
                <span
                    key={item.id}
                    onClick={() => {
                        if (item.id !== selected) {
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
