import { ReactNode, useLayoutEffect, useState } from "react";
import { WithId } from "mongodb";
import Blur from "./blur";

export default function BlurredSelector<T extends WithId<{}>>({
    header,
    items,
    renderer,
}: {
    items?: T[];
    header: ReactNode;
    renderer: (arg: SelectorRendererArgs<T>) => ReactNode;
}) {
    const [selectedItem, setSelectedItem] = useState<T>();
    const [isOpened, setOpened] = useState(false);

    useLayoutEffect(() => {
        if (typeof items === "undefined") {
            return;
        }

        setSelectedItem(items[0]);
    }, [items]);

    if (typeof items === "undefined") {
        return <div>Загрузка ...</div>;
    }

    if (typeof selectedItem === "undefined") {
        return <div>Не выбрано</div>;
    }

    if (isOpened) {
        return (
            <Blur onClick={() => setOpened(false)}>
                <div className="h-full flex items-center justify-center">
                    <div
                        className="grid gap-5 w-full mx-4 py-5 px-2"
                        style={{
                            borderRadius: "0.9375rem",
                            border: "2px solid #E9EEF1",
                            background: "#FAFAFA",
                            boxShadow:
                                "4px 4px 20px 0px rgba(31, 147, 206, 0.30)",
                        }}
                    >
                        {header}

                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setOpened(false);
                                    setSelectedItem(item);
                                }}
                            >
                                {renderer({
                                    item,
                                    selected:
                                        item._id.toString() ===
                                        selectedItem._id.toString(),
                                    picker: true,
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </Blur>
        );
    }

    return (
        <div onClick={() => setOpened(true)}>
            {renderer({ item: selectedItem, picker: false })}
        </div>
    );
}

type SelectorRendererArgs<T> = {
    item: T;
} & (
    | {
          selected: boolean;
          picker: true;
      }
    | {
          picker: false;
      }
);
