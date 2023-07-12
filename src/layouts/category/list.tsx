import { Fragment, ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ObjectId, WithId } from "mongodb";
import { Category } from "../../types/category";
import CategoryItem from "./item";
import CategoryTypeTabs from "./typetabs";
import Blur from "../../components/blur";
import LoadingLayout from "../loading";

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

    const [contextMenuData, setContextMenuData] = useState<ContextMenuData>({
        index: -1,
        x: 0,
        y: 0,
    });

    const [confirmationData, setConfirmationData] = useState<{
        header: string;
        text: string;
        handler: () => void;
    }>();

    const [busy, setBusy] = useState(false);

    return (
        <div className="grid gap-4">
            <CategoryTypeTabs selected={type} onSelect={setType} />

            <div className="relative p-4 w-full grid grid-cols-3 gap-4">
                {list.length > 0 &&
                    list.map((item, index) => (
                        <div
                            key={index}
                            onContextMenu={(event) => {
                                event.preventDefault();

                                const { clientX: X, clientY: Y } = event;

                                setContextMenuData({
                                    index,
                                    x: X,
                                    y: Y,
                                    id: item._id,
                                });
                            }}
                            className={`${
                                contextMenuData.index !== -1 &&
                                index === contextMenuData.index
                                    ? "z-20"
                                    : ""
                            }`}
                        >
                            <CategoryItem {...item} />
                        </div>
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

            {contextMenuData.index !== -1 && (
                <Fragment>
                    <div
                        className="fixed top-0 left-0 h-screen w-screen bg-transparent z-10"
                        onClick={() => {
                            setContextMenuData((data) => ({
                                ...data,
                                index: -1,
                            }));
                        }}
                    />

                    <ContextMenu position={contextMenuData}>
                        <div onClick={() => navigate("arrangement")}>
                            Реорганизовать
                        </div>
                        <div
                            onClick={() => {
                                setContextMenuData((data) => ({
                                    ...data,
                                    index: -1,
                                }));

                                setConfirmationData({
                                    header: "Удалить категорию?",
                                    text: 'Все содержащиеся в ней операции будут перемещены в категорию "Другое"',
                                    handler: () => {
                                        setConfirmationData(undefined);
                                    },
                                });
                            }}
                        >
                            Удалить
                        </div>
                    </ContextMenu>
                </Fragment>
            )}

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
                                                contextMenuData.id!.toString()
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

interface ContextMenuData {
    x: number;
    y: number;
    index: number;
    id?: ObjectId;
}

function ContextMenu({
    position,
    children,
}: {
    position: { x: number; y: number };
    children: ReactNode;
}) {
    const [style, setStyle] = useState<React.CSSProperties>({
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
    });

    useLayoutEffect(() => {
        const { innerHeight: height, innerWidth: width } = window;

        if (width - position.x < 200) {
            setStyle((style) => ({
                ...style,
                right: "1em",
            }));
        } else {
            setStyle((style) => ({
                ...style,
                left: position.x,
            }));
        }

        if (height - position.y < 100) {
            setStyle((style) => ({
                ...style,
                bottom: "1em",
            }));
        } else {
            setStyle((style) => ({
                ...style,
                top: position.y,
            }));
        }
    }, [position]);

    return (
        <div
            className="absolute bg-[#f8f8f8] z-20 w-max p-4 grid gap-3 mt-2"
            style={style}
        >
            {children}
        </div>
    );
}
