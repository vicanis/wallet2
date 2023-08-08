import { useState } from "react";
import PrimaryButton from "../components/button/primary";
import Warning from "../components/warning";
import Spinner from "../components/spinner";

export default function InviteLayout() {
    const [isJoining, setIsJoining] = useState(false);

    return (
        <Warning>
            <div className="grid gap-3 py-2">
                <span>
                    Пользователь User A. пригласил Вас для доступа к совместному
                    учету доходов и расходов
                </span>

                {isJoining ? (
                    <Spinner />
                ) : (
                    <PrimaryButton
                        title="Присоединиться"
                        onClick={() => setIsJoining(true)}
                    />
                )}
            </div>
        </Warning>
    );
}
