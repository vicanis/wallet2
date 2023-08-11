import { ReactNode, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import Blur from "./blur";
import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

export default function BlurredSelector<T extends WithId<{}>>({
    items,
    selected,
    header,
    renderer,
    createButtonRenderer,
    onChange,
}: {
    items?: T[];
    selected?: ObjectId;
    header: ReactNode;
    renderer: (arg: SelectorRendererArgs<T>) => ReactNode;
    createButtonRenderer?: () => ReactNode;
    onChange: (id: ObjectId) => void;
}) {
    const [isOpened, setOpened] = useState(false);

    if (typeof items === "undefined") {
        return <div className="py-3">Загрузка ...</div>;
    }

    const selectedItem = items
        .filter((item) => {
            if (typeof selected === "undefined") {
                return false;
            }

            return item._id.toString() === selected.toString();
        })
        .shift();

    if (!items.length) {
        if (typeof createButtonRenderer !== "undefined") {
            return <div className="py-3">{createButtonRenderer()}</div>;
        }

        return <div>Нет доступных элементов</div>;
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

                        {typeof createButtonRenderer === "function" &&
                            createButtonRenderer()}
                    </div>
                </div>
            </Blur>
        );
    }

    return (
        <div onClick={() => setOpened(true)}>
            {typeof selectedItem === "undefined" ? (
                <div className="flex items-center h-12">
                    <span className="flex-grow">Выберите из списка</span>
                    <Icon path={mdiChevronRight} size={1} />
                </div>
            ) : (
                renderer({ item: selectedItem, picker: false })
            )}
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
