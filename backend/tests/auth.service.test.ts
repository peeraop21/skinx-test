import { AuthService } from '../src/services/auth.service';
import { UserRepository } from '../src/repositories/user.repository';
import { User } from '../src/entities/user.entity';
import { EntityManager } from 'typeorm';
import { decodeToken } from '../src/utils/jwt.util';

describe('AuthService', () => {
    let authService: AuthService;
    let mockUserRepository: UserRepository;
    let mockManager = {} as EntityManager;


    beforeEach(() => {
        process.env.JWT_SECRET = 'secret';
        mockUserRepository = new UserRepository(mockManager);
        authService = new AuthService(mockUserRepository);
    });

    describe('register', () => {
        it('should register a new user', async () => {
            // Arrange
            const username: string = 'testuser';
            const password = 'password123';

            jest.spyOn(mockUserRepository, 'createUser').mockResolvedValueOnce({
                id: 2,
                username,
                password: '$2a$10$VH4sIXtssS2kvxT2NJk0zeawFgFInspetkQvLom0ncmfBiPua62n6',
            } as User);

            jest.spyOn(mockUserRepository, 'findByUsername').mockResolvedValueOnce(null);

            // Act
            const token :string = await authService.register(username, password);
            const auth = decodeToken(token);
            // Assert
            expect(auth).toBeDefined();
            expect(auth.username).toEqual(username);
        });

        it('should throw an error if registration fails', async () => {
            // Arrange
            const username = 'testuser';
            const password = 'password123';

            jest.spyOn(mockUserRepository, 'findByUsername').mockResolvedValueOnce({
                id: 2,
                username,
                password: '$2a$10$VH4sIXtssS2kvxT2NJk0zeawFgFInspetkQvLom0ncmfBiPua62n6',
            } as User);

            // Act & Assert
            await expect(authService.register(username, password)).rejects.toThrow('User already exists');
        });
    });

    describe('login', () => {
        it('should login with valid credentials', async () => {
            // Arrange
            const username = 'testuser';
            const password = 'password123';

            jest.spyOn(mockUserRepository, 'findByUsername').mockResolvedValueOnce({
                id: 2,
                username,
                password: '$2a$10$VH4sIXtssS2kvxT2NJk0zeawFgFInspetkQvLom0ncmfBiPua62n6',
            } as User);

            // Act
            const token = await authService.login(username, password);

            // Assert
            expect(token).toBeDefined();
            // Add more assertions as needed
        });

        it('should throw an error with invalid credentials', async () => {
            // Arrange
            const username = 'testuser';
            const password = 'invalidPassword';

            jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce(null);

            // Act & Assert
            await expect(authService.login(username, password)).rejects.toThrow('Invalid credentials');
        });

        it('should throw an error if password is incorrect', async () => {
            // Arrange
            const username = 'testuser';
            const password = 'incorrectPassword';

            jest.spyOn(mockUserRepository, 'findOne').mockResolvedValueOnce({
                id: 2,
                username,
                password: '$2a$10$VH4sIXtssS2kvxT2NJk0zeawFgFInspetkQvLom0ncmfBiPua62n6',
            } as User);

            // Act & Assert
            await expect(authService.login(username, password)).rejects.toThrow('Invalid credentials');
        });
    });
});