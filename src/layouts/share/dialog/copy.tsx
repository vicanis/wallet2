import { useState } from "react";
import PrimaryButton from "../../../components/button/primary";

export default function CopyButton({ url }: { url: string }) {
    const [processed, setProcessed] = useState(false);

    return (
        <PrimaryButton
            title={!processed ? "Скопировать ссылку" : "Скопировано"}
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(url);
                    setProcessed(true);
                } catch (e) {
                    if (e instanceof Error) {
                        alert(e.message);
                        return;
                    }

                    alert("Произошла ошибка");
                }
            }}
        />
    );
}
