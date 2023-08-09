import { UUID } from "crypto";

export interface User {
    user: UUID;
    email: string;
    name: string;
    token: string;
}
