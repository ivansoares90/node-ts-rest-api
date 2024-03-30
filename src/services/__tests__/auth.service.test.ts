import { AuthService } from '../auth.service';
import { UserModel } from '@/models/user.model';
import { AppError } from '@/middlewares/error.middleware';

// Mock the UserModel
jest.mock('@/models/user.model');

describe('AuthService', () => {
  let authService: AuthService;
  const mockUser = {
    _id: '123',
    email: 'test@example.com',
    password: '$2a$10$abcdefghijklmnopqrstuvwxyz', // Mock hashed password
    comparePassword: jest.fn()
  };

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('login', () => {
    const validCredentials = {
      email: 'test@example.com',
      password: 'validPassword123!'
    };

    it('should successfully login with valid credentials', async () => {
      // Mock user found with password
      (UserModel.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });
      mockUser.comparePassword.mockResolvedValue(true);

      const result = await authService.login(validCredentials);

      expect(result).toHaveProperty('token');
      expect(UserModel.findOne).toHaveBeenCalledWith({ email: validCredentials.email });
      expect(mockUser.comparePassword).toHaveBeenCalledWith(validCredentials.password);
    });

    it('should throw error if user not found', async () => {
      // Mock user not found
      (UserModel.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      });

      await expect(authService.login(validCredentials)).rejects.toThrow(
        new AppError(401, 'Invalid email or password')
      );
    });

    it('should throw error if password is invalid', async () => {
      // Mock user found but invalid password
      (UserModel.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });
      mockUser.comparePassword.mockResolvedValue(false);

      await expect(authService.login(validCredentials)).rejects.toThrow(
        new AppError(401, 'Invalid email or password')
      );
    });

    it('should throw error if password comparison fails', async () => {
      // Mock user found but password comparison error
      (UserModel.findOne as jest.Mock).mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser)
      });
      mockUser.comparePassword.mockRejectedValue(new Error('Comparison failed'));

      await expect(authService.login(validCredentials)).rejects.toThrow(
        new AppError(401, 'Invalid email or password')
      );
    });
  });
}); 