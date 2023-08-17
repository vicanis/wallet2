import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/button/primary";
import Auth from "../lib/auth";
import ImageFacebook from "../assets/social/facebook.svg";
import ImageVK from "../assets/social/vk.svg";
import ImageGoogle from "../assets/social/google.svg";
import Button from "../components/button";

export default function LoginPage() {
    const navigate = useNavigate();

    const isAuthenticated = Auth.IsAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    return (
        <div className="h-screen flex items-center p-10">
            <div className="grid gap-8 justify-center items-center text-center">
                <div>Чтобы не потерять данные, пройдите регистрацию</div>
                <br />
                <PrimaryButton
                    title="Регистрация"
                    onClick={() => {
                        Auth.SignUp(() => {
                            Auth.Close();
                            navigate("/");
                        });
                    }}
                />
                <button
                    onClick={() => {
                        Auth.SignIn(() => {
                            Auth.Close();
                            navigate("/");
                        });
                    }}
                >
                    Войти
                </button>

                <hr />

                <div className="text-sm">Войти с помощью</div>
                <div className="flex justify-center gap-4">
                    <span className="opacity-50">
                        <img src={ImageFacebook} />
                    </span>
                    <span className="opacity-50">
                        <img src={ImageVK} />
                    </span>
                    <span
                        onClick={() =>
                            Auth.SignIn((user) => {
                                Auth.Close();
                                navigate("/");
                            })
                        }
                    >
                        <img src={ImageGoogle} />
                    </span>
                </div>

                <hr />

                <Button
                    onClick={() => {
                        //
                    }}
                >
                    <span className="text-sm">
                        Продолжить без создания аккаунта
                    </span>
                </Button>
            </div>
        </div>
    );
}
