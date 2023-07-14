import { createContext } from "react";
import { ObjectId } from "mongodb";

export interface ItemData {
    index: number;
    id?: ObjectId;
}

export interface MenuData extends ItemData {
    x: number;
    y: number;
}

export const ContextMenuDefault: MenuData = {
    index: -1,
    x: 0,
    y: 0,
};

export const ContextMenuContext = createContext<{
    data: MenuData;
    setData: (data: MenuData) => void;
}>({ data: ContextMenuDefault, setData: () => {} });

export interface MenuItem {
    title: string;
    onClick: (index: number) => void;
}
