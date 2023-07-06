import Icon from "@mdi/react";
import { mdiAccountCircleOutline } from "@mdi/js";
import Auth from "../../lib/auth";
import Amount from "../amount";
import ImageCategory from "../../assets/menu/top/category.svg";
import ImageMoneyBag from "../../assets/menu/top/moneybag.svg";
import ImageBills from "../../assets/menu/top/bills.svg";
import ImageBell from "../../assets/menu/top/bell.svg";
import ImageCurrency from "../../assets/menu/top/currency.svg";
import ImageCog from "../../assets/menu/top/cog.svg";
import ImageLogout from "../../assets/menu/top/logout.svg";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const navigate = useNavigate();
    const user = Auth.User();

    return (
        <div className="grid gap-4 items-start font-medium">
            <div className="flex items-center gap-4 border-b-2 pb-4 mb-2">
                <Icon path={mdiAccountCircleOutline} size={1.5} />
                <div>
                    <div>{user.email}</div>
                    <div className="flex items-center gap-2">
                        Остаток:{" "}
                        <Amount currency="RUB" value={100000} iconSize={0.7} />
                    </div>
                </div>
            </div>

            <Item icon={ImageCategory} text="Категории" />
            <Item icon={ImageMoneyBag} text="Счета" />
            <Item icon={ImageBills} text="Регулярные платежи" />
            <Item icon={ImageBell} text="Уведомления" />
            <Item icon={ImageCurrency} text="Валюта" />
            <Item icon={ImageCog} text="Настройки" />

            <br />

            <Item
                icon={ImageLogout}
                text="Выход из аккаунта"
                onClick={() => {
                    Auth.Logout(() => {
                        Auth.Close();
                        navigate("/");
                    });
                }}
            />
        </div>
    );
}

function Item({
    icon,
    text,
    path,
    onClick,
}: {
    icon: string;
    text: string;
    path?: string;
    onClick?: () => void;
}) {
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-4"
            onClick={() => {
                if (typeof onClick === "function") {
                    onClick();
                }

                if (typeof path === "string") {
                    navigate(path);
                }
            }}
        >
            <img src={icon} className="w-6" />
            <div>{text}</div>
        </div>
    );
}
