import { ReactNode, useEffect, useState } from "react";
import {
    ConfirmationContext,
    ConfirmationContextType,
} from "../../context/confirmation";

export default function ConfirmationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, setState] = useState<ConfirmationContextType>({
        busy: false,
        visible: false,
    });

    return (
        <ConfirmationContext.Provider value={{ state, setState }}>
            {children}
        </ConfirmationContext.Provider>
    );
}
