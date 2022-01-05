import { Role } from "./role.model";

export interface AppUser {
    id: number;
    name: string;
    username: string;
    password: string;
    role: Role;
}
