import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { UUID } from "crypto";
import LoadingLayout from "../../loading";
import Blur from "../../../components/blur";
import BoxShadow from "../../boxshadow";
import PrimaryButton from "../../../components/button/primary";
import CopyButton from "./copy";

export default function ShareDialog({
    token,
    ...props
}: { token: UUID } & React.HTMLAttributes<HTMLDivElement>) {
    const [url, setUrl] = useState<string>();
    const [hasSharing, setHasSharing] = useState(false);

    useLayoutEffect(() => {
        setUrl(`${window.location.origin}/invite/${token}`);
    }, [token]);

    useEffect(() => {
        setHasSharing(typeof navigator === "function");
    }, []);

    const shareLink = useCallback(() => {
        if (!navigator.share) {
            return;
        }

        navigator.share({
            title: "Приглашение для доступа к совместному счету",
            text: "Вас пригласили для ведения совместного учета расходов и доходов. Пройдите по ссылке для подключения к совместному доступу",
            url,
        });
    }, [url]);

    if (typeof url === "undefined") {
        return <LoadingLayout>Генерация ссылки</LoadingLayout>;
    }

    return (
        <Blur {...props}>
            <div className="flex w-full h-full items-center justify-center">
                <div
                    className="w-full flex justify-center"
                    onClick={(event) => event.stopPropagation()}
                >
                    <BoxShadow>
                        <div
                            className="grid gap-2"
                            style={{ wordBreak: "break-word" }}
                        >
                            <div>
                                Перешлите эту ссылку для подключения к
                                совместному доступу
                            </div>

                            <span className="text-[#1F93CE] text-sm">
                                {url}
                            </span>
                        </div>

                        <div className="mt-4">
                            {hasSharing ? (
                                <PrimaryButton
                                    title="Поделиться"
                                    onClick={shareLink}
                                />
                            ) : (
                                <CopyButton url={url} />
                            )}
                        </div>
                    </BoxShadow>
                </div>
            </div>
        </Blur>
    );
}
