import { ReactNode, useState } from "react";
import {
    ConfirmationContext,
    ConfirmationContextType,
} from "../../context/confirmation";

export default function ConfirmationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [confirmationState, setConfirmationState] =
        useState<ConfirmationContextType>({
            busy: false,
            visible: false,
        });

    return (
        <ConfirmationContext.Provider
            value={{
                confirmationState,
                setConfirmationState,
            }}
        >
            {children}
        </ConfirmationContext.Provider>
    );
}
