import { IUserRepository } from '../repositories/interfaces/user.interface.repository';
import { hashPassword, comparePassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
import { User } from '../entities/user.entity';
import { IAuthService } from './interfaces/auth.interface.service';
import { Exception } from '../types/exception.type';

export class AuthService implements IAuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(username: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) throw new Exception('User already exists', 400);
    const hashedPassword = await hashPassword(password);
    const user = await this.userRepository.createUser({ username, password: hashedPassword, roles: ['User'] } as User);
    const token = generateToken({ username: user.username, roles: user.roles});
    return token;
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);
    if (!user || !(await comparePassword(password, user.password))) throw new Exception('Invalid credentials, username or password is not corrected.', 401);
    const token = generateToken({ username: user.username, roles: user.roles});
    return token;
  }
}