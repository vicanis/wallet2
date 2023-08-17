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
        throw new AuthError(AuthErrorCode.NoClientContext);
    }

    if (typeof ctx.user === "undefined") {
        throw new AuthError(AuthErrorCode.NoUserData);
    }

    const id = ctx.user.sub;

    if (typeof id === "undefined") {
        throw new AuthError(AuthErrorCode.NoUserId);
    }

    return id;
}

export function ParseUserName(ctx: any): string {
    if (typeof ctx === "undefined") {
        throw new AuthError(AuthErrorCode.NoClientContext);
    }

    if (typeof ctx.user === "undefined") {
        throw new AuthError(AuthErrorCode.NoUserData);
    }

    const metadata = ctx.user.user_metadata;

    if (typeof metadata === "undefined") {
        throw new AuthError(AuthErrorCode.NoUserMetadata);
    }

    const name = metadata.full_name;

    if (typeof name === "undefined") {
        throw new AuthError(AuthErrorCode.NoUserName);
    }

    return name;
}

export class AuthError extends Error {
    public code: AuthErrorCode;

    public constructor(code: AuthErrorCode) {
        super(`auth error ${code}`);
        this.code = code;
    }
}

export enum AuthErrorCode {
    NoClientContext = 0,
    NoUserData,
    NoUserId,
    NoUserMetadata,
    NoUserName,
}

export type AuthErrorResponse = {
    code: AuthErrorCode;
};
