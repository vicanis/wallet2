import { createContext } from "react";

export const ConfirmationContext = createContext<{
    confirmationState: ConfirmationContextType;
    setConfirmationState: React.Dispatch<
        React.SetStateAction<ConfirmationContextType>
    >;
}>({
    confirmationState: {
        busy: false,
        visible: false,
    },
    setConfirmationState: () => {},
});

export type ConfirmationContextType = {
    visible: boolean;
    busy: boolean;
    payload?: any;
};
