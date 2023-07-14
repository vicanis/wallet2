import { Fragment, ReactNode, useState } from "react";
import {
    ContextMenuContext,
    MenuData,
    ContextMenuDefault,
    MenuItem,
} from "../../context/contextmenu";
import ContextMenu from "./menu";

export default function ContextMenuContainer({
    children,
    items,
}: {
    children: ReactNode;
    items: MenuItem[];
}) {
    const [data, setData] = useState<MenuData>(ContextMenuDefault);

    return (
        <ContextMenuContext.Provider value={{ data, setData }}>
            {children}

            {data.index !== -1 && (
                <Fragment>
                    <div
                        className="fixed top-0 left-0 h-screen w-screen bg-transparent z-10"
                        onClick={() => {
                            setData((data) => ({
                                ...data,
                                index: -1,
                            }));
                        }}
                    />

                    <ContextMenu position={data}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setData((data) => ({
                                        ...data,
                                        index: -1,
                                    }));

                                    item.onClick(index);
                                }}
                            >
                                {item.title}
                            </div>
                        ))}
                    </ContextMenu>
                </Fragment>
            )}
        </ContextMenuContext.Provider>
    );
}
