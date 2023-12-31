import { ReactNode, useContext } from "react";
import Blur from "../blur";
import LoadingLayout from "../../layouts/loading";
import { ConfirmationContext } from "../../context/confirmation";

export default function ConfirmationPopup<T>({
    header,
    handler,
    children,
}: {
    header: string;
    handler: (payload?: T) => Promise<void>;
    children?: ReactNode;
}) {
    const { confirmationState, setConfirmationState } =
        useContext(ConfirmationContext);

    if (!confirmationState.visible) {
        return null;
    }

    if (confirmationState.busy) {
        return (
            <Blur>
                <LoadingLayout />
            </Blur>
        );
    }

    return (
        <Blur
            onClick={() =>
                setConfirmationState((state) => ({ ...state, visible: false }))
            }
        >
            <div className="flex justify-center items-center h-full w-full">
                <div
                    className="bg-[#f8f8f8] grid gap-3 px-8 py-6"
                    style={{
                        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
                        maxWidth: "80%",
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <div className="text-lg">{header}</div>

                    {children}

                    <div className="mt-4 mx-auto flex gap-20 text-[#0084C8] font-semibold uppercase">
                        <div
                            className="p-4"
                            onClick={() => {
                                setConfirmationState((state) => ({
                                    ...state,
                                    visible: false,
                                }));
                            }}
                        >
                            Нет
                        </div>
                        <div
                            className="p-4"
                            onClick={async () => {
                                setConfirmationState((state) => ({
                                    ...state,
                                    busy: true,
                                }));

                                try {
                                    await handler(confirmationState.payload);
                                } finally {
                                    setConfirmationState((state) => ({
                                        ...state,
                                        busy: false,
                                    }));
                                }
                            }}
                        >
                            Да
                        </div>
                    </div>
                </div>
            </div>
        </Blur>
    );
}
