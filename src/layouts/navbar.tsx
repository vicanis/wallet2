import { Fragment, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mdiChevronLeft, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import MonthSelector from "../components/monthselector";
import Menu from "../components/menu";
import { Transition } from "@headlessui/react";
import Blur from "../components/blur";

export default function NavBar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isMenuOpened, setMenuOpened] = useState(false);

    const title = useMemo(() => {
        switch (pathname) {
            case "/expense":
            case "/income":
                return "Новая операция";

            case "/exchange":
                return "Обмен валюты";

            case "/settings/category/new":
                return "Создание категории";

            case "/settings/category/arrangement":
                return "Реорганизовать";

            case "/settings/wallet/new":
                return "Добавление счета";

            case "/history":
                return "История операций";
        }

        const regexes: [RegExp, string][] = [
            [/\/settings\/category\/[a-f0-9]+/, "Редактирование категории"],
            [/\/settings\/wallet\/[a-f0-9]+/, "Редактирование счета"],
        ];

        for (const [regex, title] of regexes) {
            if (regex.test(pathname)) {
                return title;
            }
        }

        const prefixes: [string, string][] = [
            ["/stats", "Аналитика"],
            ["/settings/category", "Категории"],
            ["/settings/wallet", "Счета"],
            ["/settings/payment", "Регулярные платежи"],
            ["/settings/notification", "Уведомления"],
            ["/settings/currency", "Валюта"],
            ["/settings/other", "Настройки"],
        ];

        for (const [prefix, title] of prefixes) {
            if (pathname.indexOf(prefix) === 0) {
                return title;
            }
        }

        return pathname;
    }, [pathname]);

    return (
        <div
            className={`flex gap-4 items-center justify-between p-5
            ${
                pathname === "/"
                    ? "text-[#0084C8] bg-white"
                    : "text-white bg-[#0084C8]"
            }`}
        >
            {pathname === "/" ? (
                <MonthSelector />
            ) : (
                <Fragment>
                    <span onClick={() => navigate(-1)}>
                        <Icon path={mdiChevronLeft} size={1} />
                    </span>
                    <span className="flex-grow" style={{ fontWeight: 500 }}>
                        {title}
                    </span>
                </Fragment>
            )}

            <span onClick={() => setMenuOpened((flag) => !flag)}>
                <Icon path={mdiMenu} size={1} />
            </span>

            <Transition
                show={isMenuOpened}
                enter="transition-opacity duration-150"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Blur onClick={() => setMenuOpened(false)}>
                    <Menu menuClose={() => setMenuOpened(false)} />
                </Blur>
            </Transition>
        </div>
    );
}
