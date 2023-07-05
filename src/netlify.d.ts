declare interface Window {
    netlifyIdentity: NetlifyIdentity;
}

interface NetlifyIdentity {
    open: Callback;
    logout: Callback;
    on: Callback;
}

type Callback = (...args: any[]) => void;
