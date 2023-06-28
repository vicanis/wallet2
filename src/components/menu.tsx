import { ReactNode, useLayoutEffect, useState } from "react";
import ImageHome from "../assets/menu/home.svg";
import ImageExpense from "../assets/menu/expense.svg";
import ImageIncome from "../assets/menu/income.svg";
import ImageStats from "../assets/menu/stats.svg";
import ImageExchange from "../assets/menu/exchange.svg";
import { useNavigate } from "react-router-dom";

export default function Menu() {
    const [activeTab, setActiveTab] = useState<
        "home" | "expense" | "income" | "stats" | "exchange"
    >("home");

    const navigate = useNavigate();

    useLayoutEffect(() => {
        navigate("/" + activeTab);
    }, [activeTab]);

    return (
        <div className="fixed bottom-0 flex justify-around w-full h-12">
            <Icon
                active={activeTab === "home"}
                image={<img className="w-7" src={ImageHome} />}
                color="#0A90D5"
                onClick={() => setActiveTab("home")}
            />
            <Icon
                active={activeTab === "expense"}
                image={<img className="w-6" src={ImageExpense} />}
                color="#E85338"
                onClick={() => setActiveTab("expense")}
            />
            <Icon
                active={activeTab === "income"}
                image={<img className="w-6" src={ImageIncome} />}
                color="#5D8E26"
                onClick={() => setActiveTab("income")}
            />
            <Icon
                active={activeTab === "stats"}
                image={<img className="w-5" src={ImageStats} />}
                color="#0A90D5"
                onClick={() => setActiveTab("stats")}
            />
            <Icon
                active={activeTab === "exchange"}
                image={<img className="w-9" src={ImageExchange} />}
                color="#0084C8"
                onClick={() => setActiveTab("exchange")}
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
                    className="border-b-2 absolute bottom-0.5 w-10"
                    style={{ borderColor: color }}
                >
                    &nbsp;
                </div>
            )}
        </div>
    );
}
