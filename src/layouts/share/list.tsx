import { useState } from "react";
import type { User } from "../../types/user";
import PrimaryButton from "../../components/button/primary";
import Auth from "../../lib/auth";

export default function ShareList() {
    const [list, setList] = useState<User[]>([]);

    return (
        <div className="p-5 grid gap-2">
            <div className="text-center text-[#7B8083]">
                Пользователи с доступом к аккаунту
            </div>

            {list.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}

            {list.length === 0 && (
                <div className="text-center text-[#7B8083]">
                    Нет пользователей
                </div>
            )}

            <br />

            <PrimaryButton
                title="Пригласить"
                onClick={() => {
                    if (!navigator.share) {
                        alert(
                            "Отправка приглашения не поддерживается вашим браузером"
                        );
                        return;
                    }

                    navigator.share({
                        title: "Приглашение для доступа к совместному счету",
                        text: "Вас пригласили для ведения совместного учета расходов и доходов. Пройдите по ссылке для подключения к совместному доступу",
                        url: `${window.location.origin}/settings/share/?link=${Auth.User.id}`,
                    });
                }}
            />
        </div>
    );
}
