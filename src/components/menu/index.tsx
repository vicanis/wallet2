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
import ImageHistory from "../../assets/menu/top/history.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import Blur from "../blur";
import LogoutLayout from "../../layouts/logout";

export default function Menu({ menuClose }: { menuClose: () => void }) {
    const navigate = useNavigate();
    const user = Auth.User;

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    if (isLoggingOut) {
        return (
            <Blur>
                <LogoutLayout />
            </Blur>
        );
    }

    return (
        <div className="absolute right-0 bg-[#0084C8] text-white h-screen w-[80%] rounded-l-xl">
            <div className="grid gap-4 items-start font-medium">
                <div className="flex items-center gap-4 pt-2 px-4">
                    <Icon path={mdiAccountCircleOutline} size={1.5} />
                    <div>
                        <div>{user.email}</div>
                        <div className="flex items-center gap-2">
                            Остаток:{" "}
                            <Amount
                                currency="RUB"
                                value={100000}
                                iconSize={0.7}
                            />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="grid gap-6 px-4" onClick={menuClose}>
                    <div className="w-full py-4 mb-1 border-[1px] text-center">
                        Совместный доступ
                    </div>

                    <Link to="/settings/category">
                        <Item icon={ImageCategory} text="Категории" />
                    </Link>

                    <Link to="/settings/wallet">
                        <Item icon={ImageMoneyBag} text="Счета" />
                    </Link>

                    <Link to="/history">
                        <Item icon={ImageHistory} text="История операций" />
                    </Link>

                    <Link to="/settings/payment">
                        <Item icon={ImageBills} text="Регулярные платежи" />
                    </Link>

                    <Link to="/settings/notification">
                        <Item icon={ImageBell} text="Уведомления" />
                    </Link>

                    <Link to="/settings/currency">
                        <Item icon={ImageCurrency} text="Валюта" />
                    </Link>

                    <Link to="/settings/other">
                        <Item icon={ImageCog} text="Настройки" />
                    </Link>

                    <div />

                    <Item
                        icon={ImageLogout}
                        text="Выход из аккаунта"
                        onClick={(event) => {
                            event.stopPropagation();

                            setIsLoggingOut(true);

                            Auth.Logout(() => {
                                Auth.Close();
                                navigate("/");
                            });
                        }}
                    />
                </div>
            </div>
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
    onClick?: (event: React.MouseEvent) => void;
}) {
    const navigate = useNavigate();

    return (
        <div
            className="flex items-center gap-4"
            onClick={(event) => {
                if (typeof onClick === "function") {
                    onClick(event);
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
