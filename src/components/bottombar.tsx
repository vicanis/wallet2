import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageHome from "../assets/menu/bottom/home.svg";
import ImageExpense from "../assets/menu/bottom/expense.svg";
import ImageIncome from "../assets/menu/bottom/income.svg";
import ImageStats from "../assets/menu/bottom/stats.svg";
import ImageExchange from "../assets/menu/bottom/exchange.svg";

export default function BottomBar() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 flex justify-around w-full h-12 pb-2 bg-white">
            <Icon
                active={location.pathname === "/"}
                image={<img className="w-7" src={ImageHome} />}
                color="#0A90D5"
                onClick={() => navigate("/")}
            />
            <Icon
                active={location.pathname.indexOf("/expense") === 0}
                image={<img className="w-6" src={ImageExpense} />}
                color="#0A90D5"
                onClick={() => navigate("/expense")}
            />
            <Icon
                active={location.pathname.indexOf("/income") === 0}
                image={<img className="w-6" src={ImageIncome} />}
                color="#0A90D5"
                onClick={() => navigate("/income")}
            />
            <Icon
                active={location.pathname.indexOf("/stats") === 0}
                image={<img className="w-5" src={ImageStats} />}
                color="#0A90D5"
                onClick={() => navigate("/stats")}
            />
            <Icon
                active={location.pathname.indexOf("/exchange") === 0}
                image={<img className="w-9" src={ImageExchange} />}
                color="#0A90D5"
                onClick={() => navigate("/exchange")}
            />
        </div>
    );
}

function Icon({
    active,
    image,
    color,
    onClick,
}: {
    active: boolean;
    image: ReactNode;
    color: string;
    onClick: () => void;
}) {
    return (
        <div
            className={`w-full flex justify-center ${
                active ? "" : "opacity-40"
            }`}
            onClick={onClick}
        >
            {image}

            {active && (
                <div
                    className="border-b-2 absolute bottom-1.5 w-10"
                    style={{ borderColor: color }}
                >
                    &nbsp;
                </div>
            )}
        </div>
    );
}
