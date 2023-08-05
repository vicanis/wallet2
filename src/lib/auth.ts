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
        return this.User !== null;
    }

    public get User(): User {
        const user = window.netlifyIdentity.currentUser();

        return {
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

export interface User {
    email: string;
    name: string;
    token: string;
}

export function ParseUserId(ctx: any): string {
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

export type WithUser<T> = T & { user: string };
