import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/button/primary";
import PiggyBank from "../components/piggybank";

export default function WelcomePage() {
    const navigate = useNavigate();

    return (
        <div className="grid items-center h-screen py-12">
            <div className="grid gap-4 my-auto text-center">
                <div className="text-3xl font-medium">Добро пожаловать</div>
            </div>
            <PiggyBank />
            <div className="px-12">
                Мои финансы - приложение для простого учета доходов и расходов
            </div>

            <PrimaryButton
                title="Начать"
                onClick={() => {
                    navigate("/login");
                }}
            />
        </div>
    );
}
