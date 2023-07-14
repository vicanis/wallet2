import { ReactNode, useContext } from "react";
import { ContextMenuContext, ItemData } from "../../context/contextmenu";

export default function ContextMenuItem({
    item,
    children,
}: {
    item: ItemData;
    children: ReactNode;
}) {
    const { data, setData } = useContext(ContextMenuContext);

    return (
        <div
            onContextMenu={(event) => {
                event.preventDefault();
                const { clientX: x, clientY: y } = event;
                setData({ x, y, ...item });
            }}
            className={`${
                data.index !== -1 && item.index === data.index ? "z-20" : ""
            }`}
        >
            {children}
        </div>
    );
}
