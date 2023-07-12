import { ReactNode, useMemo, useState } from "react";
import { ObjectId, WithId } from "mongodb";
import { Draggable } from "react-drag-reorder";
import { Category } from "../../types/category";
import CategoryTypeTabs from "./typetabs";
import CategoryItem from "./item";
import Blur from "../../components/blur";
import LoadingLayout from "../loading";

export default function CategoryArrangementLayout({
    initList,
}: {
    initList: WithId<Category>[];
}) {
    const [currentList, setCurrentList] = useState(initList);

    const [type, setType] = useState<"expense" | "income">("expense");

    const list = useMemo<WithId<Category>[]>(() => {
        return [
            ...currentList.filter((item) => item.type === type),
            {
                _id: "other" as unknown as ObjectId,
                type,
                name: "Другое",
                color: "#3EC79E",
                plan: {},
            },
        ].map((item, index) => {
            if (typeof item.order !== "undefined") {
                return item;
            }

            return {
                ...item,
                order: index,
            };
        });
    }, [currentList, type]);

    const [busy, setBusy] = useState(false);

    return (
        <div>
            <div className="grid gap-4">
                <CategoryTypeTabs selected={type} onSelect={setType} />

                <div className="relative p-4 w-full grid grid-cols-3 gap-4">
                    {busy && (
                        <Blur mode="absolute">
                            <LoadingLayout />
                        </Blur>
                    )}

                    <Draggable
                        onPosChange={async (prev, curr) => {
                            setBusy(true);

                            const items = [list[prev], list[curr]].map(
                                ({ _id, order }) => ({ _id, order })
                            );

                            const tmp = items[0].order;
                            items[0].order = items[1].order;
                            items[1].order = tmp;

                            try {
                                await fetch(
                                    "/.netlify/functions/sort_category",
                                    {
                                        method: "POST",
                                        body: JSON.stringify(items),
                                    }
                                );
                            } finally {
                                setBusy(false);
                            }
                        }}
                    >
                        {list.length > 0 &&
                            list.map((item, index) => (
                                <ItemContainer key={index}>
                                    <CategoryItem {...item} />
                                </ItemContainer>
                            ))}
                    </Draggable>
                </div>
            </div>
        </div>
    );
}

function ItemContainer({ children }: { children: ReactNode }) {
    return <div className="py-6 bg-[#D9D9D9]">{children}</div>;
}
