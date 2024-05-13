import { User } from "../../entities/user.entity";

export interface IAuthService {
    register(username: string, password: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
}