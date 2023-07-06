import { Fragment, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Auth from "../../lib/auth";

export default function LoginWrapper({ children }: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const logged = Auth.IsAuthenticated();

    const welcome = ["/welcome", "/login"].indexOf(location.pathname) !== -1;

    useEffect(() => {
        if (!logged && !welcome) {
            navigate("/welcome");
        }
    }, [logged]);

    if (!logged && !welcome) {
        return <div />;
    }

    return <Fragment>{children}</Fragment>;
}
