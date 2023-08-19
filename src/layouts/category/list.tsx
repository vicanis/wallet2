import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObjectId, WithId } from "mongodb";
import fetcher from "../../lib/fetcher";
import { Category } from "../../types/category";
import CategoryItem from "./item";
import CategoryTypeTabs from "./typetabs";
import ContextMenuContainer from "../../components/contextmenu";
import ContextMenuItem from "../../components/contextmenu/item";
import { ConfirmationContext } from "../../context/confirmation";
import ConfirmationPopup from "../../components/confirmation/popup";
import LoadingLayout from "../loading";
import Blur from "../../components/blur";

export default function CategoryList({
    list: fullList,
}: {
    list: WithId<Category>[];
}) {
    const navigate = useNavigate();

    const [type, setType] = useState<"expense" | "income">("expense");
    const [busy, setBusy] = useState(false);

    const list = useMemo(() => {
        return fullList.filter((item) => item.type === type);
    }, [fullList, type]);

    const { setConfirmationState } = useContext(ConfirmationContext);

    if (busy) {
        return (
            <Blur>
                <LoadingLayout />
            </Blur>
        );
    }

    return (
        <div className="grid gap-4">
            <CategoryTypeTabs selected={type} onSelect={setType} />

            <ContextMenuContainer
                items={[
                    {
                        title: "Реорганизовать",
                        onClick: () => navigate("arrangement"),
                    },
                    {
                        title: "Удалить",
                        onClick: (id: string) => {
                            const item = list
                                .filter((item) => item._id.toString() === id)
                                .shift();

                            setConfirmationState((state) => ({
                                ...state,
                                visible: true,
                                payload: item,
                            }));
                        },
                    },
                ]}
            >
                <div className="relative p-4 w-full grid grid-cols-3 gap-4">
                    {list.length > 0 &&
                        list.map((item, index) => (
                            <ContextMenuItem
                                key={item._id.toString()}
                                item={{ id: item._id }}
                            >
                                <CategoryItem {...item} />
                            </ContextMenuItem>
                        ))}

                    <CategoryItem
                        _id={"new" as unknown as ObjectId}
                        type="expense"
                        color="#0084C8"
                        name="Создать"
                        icon="plus"
                        plan={{}}
                    />

                    <ConfirmationPopup<WithId<Category>>
                        header="Удалить категорию?"
                        handler={async (category) => {
                            if (typeof category === "undefined") {
                                return;
                            }

                            setBusy(true);

                            await fetcher(
                                "del_category/?id=" + category._id.toString()
                            );

                            navigate(0);
                        }}
                    />
                </div>
            </ContextMenuContainer>
        </div>
    );
}
