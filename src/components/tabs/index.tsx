import { useState } from "react";
import Item from "./item";

export default function Tabs({
    tabs,
    selected: initSelected,
    onSelect,
}: {
    tabs: Omit<Tab, "selected">[];
    selected: string;
    onSelect: (tab: Omit<Tab, "selected">) => void;
}) {
    const [selected, setSelected] = useState<string>(() => {
        for (const { id } of tabs) {
            if (initSelected === id) {
                return id;
            }
        }

        return tabs[0].id;
    });

    return (
        <div
            className="font-semibold text-white uppercase rounded-b-xl grid grid-cols-2 justify-items-center"
            style={{
                backgroundColor: "#0084C8",
            }}
        >
            {tabs.map(({ id, ...rest }) => (
                <Item
                    key={id}
                    selected={selected === id}
                    {...rest}
                    onClick={() => {
                        setSelected((selected) =>
                            selected === id ? selected : id
                        );
                        onSelect({ id, ...rest });
                    }}
                />
            ))}
        </div>
    );
}

export interface Tab {
    id: string;
    icon: string;
    name: string;
    selected: boolean;
}
