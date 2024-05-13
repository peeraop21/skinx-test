import {  BaseEntity, EntityManager, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from './interfaces/user.interface.repository';

export class UserRepository extends Repository<User> implements IUserRepository {
    constructor(manager: EntityManager) {
        super(User, manager);
    }
    async createUser(user: User): Promise<User> {
        user.createdBy = user.username;
        user.createdAt = new Date();
        return await this.save(user);
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.findOne({ where: { username } });
    }

}