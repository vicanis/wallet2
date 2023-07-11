import { useState } from "react";
import Blur from "../blur";
import LoadingLayout from "../../layouts/loading";

export default function PrimaryButton({
    title,
    onClick,
}: {
    title: string;
    onClick?: () => void | Promise<void>;
}) {
    const [busy, setBusy] = useState(false);

    if (busy) {
        return (
            <Blur>
                <LoadingLayout />
            </Blur>
        );
    }

    return (
        <div
            className="w-max mx-auto px-8 py-4 rounded-xl font-semibold"
            style={{
                backgroundColor: "#1F93CE",
                color: "#F6FCFF",
            }}
            onClick={async () => {
                if (typeof onClick !== "function") {
                    return;
                }

                setBusy(true);

                try {
                    await onClick();
                } finally {
                    setBusy(false);
                }
            }}
        >
            {title}
        </div>
    );
}
