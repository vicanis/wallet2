import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "../lib/fetcher";
import PrimaryButton from "../components/button/primary";
import Warning from "../components/warning";
import Spinner from "../components/spinner";
import { Invitation } from "../types/invitation";

export default function InviteLayout({
    data,
}: {
    data: Pick<Invitation, "token" | "author"> & { joined: boolean };
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

    return (
        <Warning>
            <div className="grid gap-3 py-2">
                <span className="text-left">
                    Пользователь <b>{data.author.name}</b> пригласил Вас для
                    доступа к совместному учету доходов и расходов
                </span>

                {!data.joined ? (
                    isJoining ? (
                        <Spinner />
                    ) : (
                        <PrimaryButton
                            title="Присоединиться"
                            onClick={async () => {
                                setIsJoining(true);

                                await fetcher(
                                    "invitation/?token=" + data.token,
                                    {
                                        method: "PATCH",
                                    }
                                );

                                setIsJoining(false);
                            }}
                            style={{
                                padding: "1em",
                            }}
                        />
                    )
                ) : (
                    <PrimaryButton
                        title="Вы уже присоединились"
                        disabled
                        style={{
                            padding: "1em",
                        }}
                    />
                )}
            </div>
        </Warning>
    );
}
