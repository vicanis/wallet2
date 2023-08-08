import { UUID } from "crypto";

export interface Invitation {
    author: {
        id: UUID;
        name: string;
    };
    token: UUID;
    created: Date;
    users: UUID[];
}
