import { Fragment, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mdiChevronLeft, mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
import MonthSelector from "../components/monthselector";
import Overlay from "../components/menu/overlay";
import Menu from "../components/menu";

export default function NavBar() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const title = useMemo(() => {
        switch (pathname) {
            case "/expense":
            case "/income":
                return "Новая операция";

            case "/exchange":
                return "Обмен валюты";
        }

        if (pathname.indexOf("/stats") === 0) {
            return "Аналитика";
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

            <span onClick={() => setIsMenuOpened((flag) => !flag)}>
                <Icon path={mdiMenu} size={1} />
            </span>

            {isMenuOpened && (
                <Overlay onClick={() => setIsMenuOpened(false)}>
                    <Menu />
                </Overlay>
            )}
        </div>
    );
}
