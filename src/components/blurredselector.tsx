import { ReactNode, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import Blur from "./blur";

export default function BlurredSelector<T extends WithId<{}>>({
    items,
    selected,
    header,
    renderer,
    onChange,
}: {
    items?: T[];
    selected?: ObjectId;
    header: ReactNode;
    renderer: (arg: SelectorRendererArgs<T>) => ReactNode;
    onChange: (id: ObjectId) => void;
}) {
    const [isOpened, setOpened] = useState(false);

    if (typeof items === "undefined") {
        return <div className="py-3">Загрузка ...</div>;
    }

    const selectedItem = items
        .filter((item) => {
            if (typeof selected === "undefined") {
                return true;
            }

            return item._id.toString() === selected.toString();
        })
        .shift();

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
                                    onChange(item._id);
                                }}
                            >
                                {renderer({
                                    item,
                                    selected:
                                        typeof selectedItem !== "undefined" &&
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
            {renderer({ item: selectedItem!, picker: false })}
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
