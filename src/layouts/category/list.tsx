import { Fragment, ReactNode, useLayoutEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { WithId } from "mongodb";
import { Category } from "../../types/category";
import Button from "../../components/button";
import CategoryItem from "./item";
import CategoryTypeTabs from "./typetabs";

export default function CategoryList({
    list: fullList,
}: {
    list: WithId<Category>[];
}) {
    const [type, setType] = useState<"expense" | "income">("expense");

    const list = useMemo(() => {
        return fullList.filter((item) => item.type === type);
    }, [fullList, type]);

    const [contextMenuData, setContextMenuData] = useState<ContextMenuData>({
        index: -1,
        x: 0,
        y: 0,
    });

    return (
        <div className="grid gap-4">
            <CategoryTypeTabs selected={type} onSelect={setType} />

            <div>
                <Link to="new">
                    <Button>Создать категорию</Button>
                </Link>

                {list.length > 0 ? (
                    <div className="relative p-4 w-full grid grid-cols-3 gap-4">
                        {list.map((item, index) => (
                            <div
                                key={index}
                                onContextMenu={(event) => {
                                    event.preventDefault();

                                    const {
                                        button,
                                        clientX: X,
                                        clientY: Y,
                                    } = event;

                                    if (button === 2) {
                                        setContextMenuData({
                                            index,
                                            x: X,
                                            y: Y,
                                        });
                                    }
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
                    </div>
                ) : (
                    <div className="text-[#808080]">Не найдено</div>
                )}

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
                            <div>Реорганизовать</div>
                            <div>Удалить</div>
                        </ContextMenu>
                    </Fragment>
                )}
            </div>
        </div>
    );
}

interface ContextMenuData {
    x: number;
    y: number;
    index: number;
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
            className="absolute bg-[#f8f8f8] bg-opacity-90 z-20 w-max p-4 grid gap-3 mt-2"
            style={style}
        >
            {children}
        </div>
    );
}
