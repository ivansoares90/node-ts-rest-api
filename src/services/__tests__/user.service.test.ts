import { UserService } from '../user.service';
import { MockUserModel } from './mocks/user.model.mock';
import { AppError } from '@/middlewares/error.middleware';
import { CreateUserDto, UpdateUserDto } from '@/types/user.types';

// Mock the UserModel
jest.mock('@/models/user.model', () => ({
  UserModel: MockUserModel
}));

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    MockUserModel.clear(); // Clear the mock database before each test
  });

  describe('create', () => {
    const validUserData: CreateUserDto = {
      email: 'test@example.com',
      password: 'Test123!@#',
      firstName: 'John',
      lastName: 'Doe'
    };

    it('should create a new user with valid data', async () => {
      const user = await userService.create(validUserData);

      expect(user).toBeDefined();
      expect(user.email).toBe(validUserData.email);
      expect(user.firstName).toBe(validUserData.firstName);
      expect(user.lastName).toBe(validUserData.lastName);
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should throw error if email already exists', async () => {
      await userService.create(validUserData);

      await expect(userService.create(validUserData)).rejects.toThrow(
        new AppError(409, 'User with this email already exists')
      );
    });

    it('should throw validation error for invalid email', async () => {
      const invalidData = { ...validUserData, email: 'invalid-email' };
      await expect(userService.create(invalidData)).rejects.toThrow('Invalid email format');
    });

    it('should throw validation error for weak password', async () => {
      const invalidData = { ...validUserData, password: 'weak' };
      await expect(userService.create(invalidData)).rejects.toThrow('Password must be at least 8 characters long');
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        password: 'Test123!@#',
        firstName: 'John',
        lastName: 'Doe'
      });

      const foundUser = await userService.getById(user.id);
      expect(foundUser).toEqual(user);
    });

    it('should throw error if user not found', async () => {
      await expect(userService.getById('non-existent-id')).rejects.toThrow(
        new AppError(404, 'User not found')
      );
    });
  });

  describe('update', () => {
    it('should update user with valid data', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        password: 'Test123!@#',
        firstName: 'John',
        lastName: 'Doe'
      });

      const updateData: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith'
      };

      const updatedUser = await userService.update(user.id, updateData);
      expect(updatedUser.firstName).toBe(updateData.firstName);
      expect(updatedUser.lastName).toBe(updateData.lastName);
      expect(updatedUser.email).toBe(user.email); // Email should not change
    });

    it('should throw error if updating to existing email', async () => {
      const user1 = await userService.create({
        email: 'test1@example.com',
        password: 'Test123!@#',
        firstName: 'John',
        lastName: 'Doe'
      });

      const user2 = await userService.create({
        email: 'test2@example.com',
        password: 'Test123!@#',
        firstName: 'Jane',
        lastName: 'Smith'
      });

      await expect(userService.update(user1.id, { email: user2.email })).rejects.toThrow(
        new AppError(409, 'Email is already in use')
      );
    });

    it('should throw error if user not found', async () => {
      const updateData: UpdateUserDto = {
        firstName: 'Jane'
      };

      await expect(userService.update('non-existent-id', updateData)).rejects.toThrow(
        new AppError(404, 'User not found')
      );
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        password: 'Test123!@#',
        firstName: 'John',
        lastName: 'Doe'
      });

      await userService.remove(user.id);
      await expect(userService.getById(user.id)).rejects.toThrow(
        new AppError(404, 'User not found')
      );
    });

    it('should throw error if user not found', async () => {
      await expect(userService.remove('non-existent-id')).rejects.toThrow(
        new AppError(404, 'User not found')
      );
    });
  });
}); 