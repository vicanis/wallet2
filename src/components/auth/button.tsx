import Icon from "@mdi/react";
import Auth from "../../lib/auth";
import { mdiLogout } from "@mdi/js";
import { useNavigate } from "react-router-dom";

export default function AuthButton() {
    const navigate = useNavigate();
    const user = Auth.User();

    if (user) {
        return (
            <div className="flex items-center gap-2">
                <div>{user.user_metadata.full_name}</div>

                <a
                    onClick={() => {
                        Auth.Logout(() => {
                            navigate("/");
                        });
                    }}
                >
                    <Icon path={mdiLogout} size={0.7} />
                </a>
            </div>
        );
    }

    return (
        <a
            onClick={() => {
                Auth.SignIn((user) => {
                    Auth.Close();
                    navigate("/");
                });
            }}
        >
            Login
        </a>
    );
}
