import { ReactNode, useMemo, useState } from "react";
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

    const mdata = useMemo(
        () => ({ confirmationState, setConfirmationState }),
        [confirmationState, setConfirmationState]
    );

    return (
        <ConfirmationContext.Provider value={mdata}>
            {children}
        </ConfirmationContext.Provider>
    );
}
