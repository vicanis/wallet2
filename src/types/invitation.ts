import { UUID } from "crypto";

export interface Invitation {
    author: UUID;
    token: UUID;
    created: Date;
    users: UUID[];
}
