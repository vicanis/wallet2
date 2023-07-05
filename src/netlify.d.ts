declare interface Window {
    netlifyIdentity: NetlifyIdentity;
}

interface NetlifyIdentity {
    open: Callback;
    logout: Callback;
    on: Callback;
    close: Callback;
    currentUser: () => User;
}

type Callback = (...args: any[]) => void;
