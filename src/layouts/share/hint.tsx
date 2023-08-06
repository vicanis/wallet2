import BoxShadow from "../boxshadow";
import ImageShare from "../../assets/share.svg";

export default function ShareHint() {
    return (
        <div className="flex justify-center text-sm">
            <BoxShadow>
                <div className="flex items-start justify-between gap-4">
                    <span>
                        Пригласите в ваш аккаунт близких или партнеров и ведите
                        совместный учет. Вы всегда сможете отключить доступ
                        пользователю без потери данных.
                    </span>
                    <img src={ImageShare} className="mt-5" />
                </div>
                <a className="text-[#0084C8] font-semibold">Узнать подробнее</a>
            </BoxShadow>
        </div>
    );
}
