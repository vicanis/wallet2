import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "../../lib/fetcher";
import type { Invitation } from "../../types/invitation";
import PrimaryButton from "../../components/button/primary";
import LoadingLayout from "../loading";
import ShareDialog from "./dialog";

export default function ShareList({ invitation }: { invitation: Invitation }) {
    const navigate = useNavigate();
    const [busy, setBusy] = useState(false);
    const [isShareDialogOpened, setIsShareDialogOpened] = useState(false);

    if (busy) {
        return <LoadingLayout>Пожалуйста, подождите ...</LoadingLayout>;
    }

    if (typeof invitation !== "undefined" && isShareDialogOpened) {
        return (
            <ShareDialog
                token={invitation.token}
                onClick={() => setIsShareDialogOpened(false)}
            />
        );
    }

    if (invitation !== null && !invitation.my) {
        return (
            <div className="p-5 grid gap-4">
                <div>
                    Вы присоединились к совместному доступу, открытому{" "}
                    <b>{invitation.author}</b>
                </div>

                {invitation && (
                    <span className="text-center">
                        <a
                            className="text-[#1F93CE]"
                            onClick={async () => {
                                setBusy(true);

                                await fetcher("invitation/?action=drop", {
                                    method: "PATCH",
                                });

                                navigate(0);
                            }}
                        >
                            Отказаться от совместного доступа
                        </a>
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className="p-5 grid gap-5">
            {invitation && (
                <div className="grid gap-3">
                    <div className="text-[#7B8083]">
                        Совместный доступ открыт
                    </div>

                    <div>
                        {invitation.users.length > 0 && (
                            <div className="grid gap-3">
                                <div>Доступ предоставлен пользователям:</div>

                                <ol className="list-decimal ml-4">
                                    {invitation.users.map((id) => (
                                        <li key={id}>{id}</li>
                                    ))}
                                </ol>
                            </div>
                        )}
                        {invitation.users.length === 0 && (
                            <span className="text-[#7B8083]">
                                Нет добавленных пользователей
                            </span>
                        )}
                    </div>
                </div>
            )}

            {!invitation ? (
                <PrimaryButton
                    title={"Открыть совместный доступ"}
                    onClick={async () => {
                        setBusy(true);

                        await fetcher("invitation", {
                            method: "POST",
                        });

                        navigate(0);
                    }}
                />
            ) : (
                <PrimaryButton
                    title={"Пригласить пользователей"}
                    onClick={() => setIsShareDialogOpened(true)}
                />
            )}

            <br />

            {invitation && (
                <span className="text-center">
                    <a
                        className="text-[#1F93CE]"
                        onClick={async () => {
                            setBusy(true);

                            await fetcher("invitation", {
                                method: "DELETE",
                            });

                            navigate(0);
                        }}
                    >
                        Закрыть совместный доступ
                    </a>
                </span>
            )}
        </div>
    );
}
