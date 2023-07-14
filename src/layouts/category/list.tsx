import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObjectId, WithId } from "mongodb";
import { Category } from "../../types/category";
import CategoryItem from "./item";
import CategoryTypeTabs from "./typetabs";
import Blur from "../../components/blur";
import LoadingLayout from "../loading";
import ContextMenuContainer from "../../components/contextmenu";
import ContextMenuItem from "../../components/contextmenu/item";

export default function CategoryList({
    list: fullList,
}: {
    list: WithId<Category>[];
}) {
    const navigate = useNavigate();

    const [type, setType] = useState<"expense" | "income">("expense");

    const list = useMemo(() => {
        return fullList.filter((item) => item.type === type);
    }, [fullList, type]);

    const [confirmationData, setConfirmationData] = useState<{
        header: string;
        text: string;
        handler: () => void;
        id: ObjectId;
    }>();

    const [busy, setBusy] = useState(false);

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
                        onClick: (index) => {
                            setConfirmationData({
                                header: "Удалить категорию?",
                                text: 'Все содержащиеся в ней операции будут перемещены в категорию "Другое"',
                                id: list[index]._id,
                                handler: () => {
                                    setConfirmationData(undefined);
                                },
                            });
                        },
                    },
                ]}
            >
                <div className="relative p-4 w-full grid grid-cols-3 gap-4">
                    {list.length > 0 &&
                        list.map((item, index) => (
                            <ContextMenuItem
                                key={index}
                                item={{ index, id: item._id }}
                            >
                                <CategoryItem {...item} />
                            </ContextMenuItem>
                        ))}

                    <CategoryItem
                        _id={"other" as unknown as ObjectId}
                        type="expense"
                        color="#3EC79E"
                        name="Другое"
                        plan={{}}
                    />

                    <CategoryItem
                        _id={"new" as unknown as ObjectId}
                        type="expense"
                        color="#0084C8"
                        name="Создать"
                        icon="plus"
                        plan={{}}
                    />
                </div>
            </ContextMenuContainer>

            {typeof confirmationData !== "undefined" && (
                <Blur onClick={() => setConfirmationData(undefined)}>
                    <div className="flex justify-center items-center h-full w-full">
                        <div
                            className="bg-[#f8f8f8] grid gap-3 px-8 py-6"
                            style={{
                                boxShadow:
                                    "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
                                maxWidth: "80%",
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="text-lg">
                                {confirmationData.header}
                            </div>

                            <div>{confirmationData.text}</div>

                            <div className="mt-4 mx-auto flex gap-20 text-[#0084C8] font-semibold uppercase">
                                <div
                                    className="p-4"
                                    onClick={() => {
                                        setConfirmationData(undefined);
                                    }}
                                >
                                    Нет
                                </div>
                                <div
                                    className="p-4"
                                    onClick={async () => {
                                        setBusy(true);

                                        await fetch(
                                            "/.netlify/functions/del_category/?id=" +
                                                confirmationData.id!.toString()
                                        );

                                        navigate(0);
                                    }}
                                >
                                    Да
                                </div>
                            </div>
                        </div>
                    </div>
                </Blur>
            )}

            {busy && (
                <Blur>
                    <LoadingLayout />
                </Blur>
            )}
        </div>
    );
}
