import { UUID } from "crypto";
import { User } from "../types/user";

class AuthClass {
    public SignUp(callback: (user: User) => void) {
        window.netlifyIdentity.open("signup");
        window.netlifyIdentity.on("login", callback);
    }

    public SignIn(callback: (user: User) => void) {
        window.netlifyIdentity.open("login");
        window.netlifyIdentity.on("login", callback);
    }

    public Logout(callback: () => void) {
        window.netlifyIdentity.logout();
        window.netlifyIdentity.on("logout", callback);
    }

    public Close() {
        window.netlifyIdentity.close();
    }

    public IsAuthenticated() {
        return window.netlifyIdentity.currentUser() !== null;
    }

    public get User(): User {
        const user = window.netlifyIdentity.currentUser();

        return {
            user: user.id,
            email: user.email,
            get name(): string {
                return user.user_metadata.full_name;
            },
            get token(): string {
                return user.token.access_token;
            },
        };
    }
}

const Auth = new AuthClass();

export default Auth;

export function ParseUserId(ctx: any): UUID {
    if (typeof ctx === "undefined") {
        throw new Error("no client context");
    }

    if (typeof ctx.user === "undefined") {
        throw new Error("no user data");
    }

    const id = ctx.user.sub;

    if (typeof id === "undefined") {
        throw new Error("no user id");
    }

    return id;
}

export function ParseUserName(ctx: any): string {
    if (typeof ctx === "undefined") {
        throw new Error("no client context");
    }

    if (typeof ctx.user === "undefined") {
        throw new Error("no user data");
    }

    const metadata = ctx.user.user_metadata;

    if (typeof metadata === "undefined") {
        throw new Error("no user metadata");
    }

    const name = metadata.full_name;

    if (typeof name === "undefined") {
        throw new Error("no user name");
    }

    return name;
}

export type WithUser<T> = T & { user: string };
