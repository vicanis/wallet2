import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "../lib/fetcher";
import PrimaryButton from "../components/button/primary";
import Warning from "../components/warning";
import Spinner from "../components/spinner";
import type { Invitation } from "../types/invitation";

export default function InviteLayout({
    data,
}: {
    data: Pick<Invitation<string>, "token" | "author"> & { joined: boolean };
}) {
    const navigate = useNavigate();
    const [isJoining, setIsJoining] = useState(false);

    if (data === null) {
        return (
            <Warning onClick={() => navigate("/")}>
                <div>
                    Ссылка-приглашение в совместный доступ не действительная
                </div>
            </Warning>
        );
    }

    if (data.joined) {
        return (
            <Warning onClick={() => navigate("/settings/share")}>
                Вы уже присоединились к совместному доступу
            </Warning>
        );
    }

    return (
        <Warning>
            <div className="grid gap-3 py-2">
                <span className="text-left">
                    Пользователь <b>{data.author}</b> пригласил Вас для доступа
                    к совместному учету доходов и расходов
                </span>

                <PrimaryButton
                    title={
                        <div className="flex items-center gap-3">
                            {isJoining && <Spinner size={6} />}
                            <span>
                                {!isJoining
                                    ? "Присоединиться"
                                    : "Присоединение ..."}
                            </span>
                        </div>
                    }
                    disabled={isJoining}
                    spinner={false}
                    onClick={async () => {
                        setIsJoining(true);

                        await fetcher("invitation/?token=" + data.token, {
                            method: "PATCH",
                        });

                        navigate("/settings/share");
                    }}
                    style={{
                        padding: "1em",
                    }}
                />
            </div>
        </Warning>
    );
}
