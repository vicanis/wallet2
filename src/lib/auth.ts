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
        return this.User() !== null;
    }

    public User(): User {
        return window.netlifyIdentity.currentUser();
    }
}

const Auth = new AuthClass();

export default Auth;

export interface User {
    email: string;
    user_metadata: {
        full_name: string;
    };
}
