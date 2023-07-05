import Auth from "../lib/auth";

export default function useAuth() {
    return Auth.IsAuthenticated();
}
