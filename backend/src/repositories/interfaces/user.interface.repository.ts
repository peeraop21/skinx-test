import { Repository } from "typeorm";
import { User } from "../../entities/user.entity";

export interface IUserRepository extends Repository<User> {
    createUser(user: User): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
}