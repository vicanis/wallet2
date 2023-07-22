import { createContext } from "react";

export const ConfirmationContext = createContext<{
    state: ConfirmationContextType;
    setState: React.Dispatch<React.SetStateAction<ConfirmationContextType>>;
}>({
    state: {
        busy: false,
        visible: false,
    },
    setState: () => {},
});

export type ConfirmationContextType = {
    visible: boolean;
    busy: boolean;
    payload?: any;
};
