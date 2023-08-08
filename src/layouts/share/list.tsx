import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../../lib/auth";
import fetcher from "../../lib/fetcher";
import dayjs from "../../lib/dayjs";
import type { Invitation } from "../../types/invitation";
import PrimaryButton from "../../components/button/primary";
import LoadingLayout from "../loading";
import ShareDialog from "./dialog";

export default function ShareList({ invitation }: { invitation?: Invitation }) {
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

    return (
        <div className="p-5 grid gap-2">
            <div className="text-[#7B8083]">Ключ доступа</div>

            {!invitation ? (
                <span>не создан</span>
            ) : (
                <div>
                    <b>
                        *
                        {invitation.token.substring(
                            invitation.token.length - 4
                        )}
                    </b>
                    {", "}
                    создан {dayjs(invitation.created).fromNow()}
                    {", "}
                    {invitation.users.length > 0 && (
                        <div>
                            <span>Доступ предоставлен пользователям:</span>
                            Всего <b>{invitation.users.length}</b> шт.
                            {invitation.users.map((id) => (
                                <span key={id}>{id}</span>
                            ))}
                        </div>
                    )}
                    {invitation.users.length === 0 && (
                        <span>нет добавленных пользователей</span>
                    )}
                </div>
            )}

            <br />

            {!invitation ? (
                <PrimaryButton
                    title={"Создать ключ доступа"}
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
