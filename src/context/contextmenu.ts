import { createContext } from "react";
import { ObjectId } from "mongodb";

export interface ItemData {
    id?: ObjectId;
}

export interface MenuData extends ItemData {
    visible: boolean;
    x: number;
    y: number;
}

export const ContextMenuDefault: MenuData = {
    visible: false,
    x: 0,
    y: 0,
};

export const ContextMenuContext = createContext<{
    data: MenuData;
    setData: (data: MenuData) => void;
}>({ data: ContextMenuDefault, setData: () => {} });

export interface MenuItem {
    title: string;
    onClick: (id: string) => void;
}
