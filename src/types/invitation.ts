import { UUID } from "crypto";

export interface Invitation<T extends string = UUID> {
    author: T;
    token: UUID;
    created: Date;
    users: T[];
    my?: boolean;
}
