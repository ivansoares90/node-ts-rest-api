import { UserService } from '../user.service';
import { AppError } from '../../middlewares/error.middleware';
import { CreateUserDto, UpdateUserDto } from '../../types/user.types';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  describe('create', () => {
    const mockUserData: CreateUserDto = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123',
    };

    it('should create a new user', async () => {
      const user = await userService.create(mockUserData);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBe(mockUserData.email);
      expect(user.firstName).toBe(mockUserData.firstName);
      expect(user.lastName).toBe(mockUserData.lastName);
      expect(user.createdAt).toBeDefined();
      expect(user.updatedAt).toBeDefined();
    });

    it('should throw AppError if user with email already exists', async () => {
      await userService.create(mockUserData);
      await expect(userService.create(mockUserData)).rejects.toThrow(AppError);
      await expect(userService.create(mockUserData)).rejects.toThrow('User with this email already exists');
    });

    it('should generate unique IDs for different users', async () => {
      const user1 = await userService.create(mockUserData);
      const user2 = await userService.create({
        ...mockUserData,
        email: 'another@example.com',
      });
      expect(user1.id).not.toBe(user2.id);
    });
  });

  describe('findById', () => {
    it('should find user by ID', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      const found = await userService.findById(user.id);
      expect(found).toBeDefined();
      expect(found.id).toBe(user.id);
    });

    it('should throw AppError if user not found', async () => {
      await expect(userService.findById('non-existent-id')).rejects.toThrow(AppError);
      await expect(userService.findById('non-existent-id')).rejects.toThrow('User not found');
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      const found = await userService.findByEmail(user.email);
      expect(found).toBeDefined();
      expect(found.email).toBe(user.email);
    });

    it('should throw AppError if user not found', async () => {
      await expect(userService.findByEmail('non-existent@example.com')).rejects.toThrow(AppError);
      await expect(userService.findByEmail('non-existent@example.com')).rejects.toThrow('User not found');
    });
  });

  describe('update', () => {
    it('should update user', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      const updateData: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const updated = await userService.update(user.id, updateData);
      expect(updated.firstName).toBe(updateData.firstName);
      expect(updated.lastName).toBe(updateData.lastName);
      expect(updated.updatedAt).toBeGreaterThan(user.updatedAt);
    });

    it('should throw AppError if user not found', async () => {
      const updateData: UpdateUserDto = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      await expect(userService.update('non-existent-id', updateData)).rejects.toThrow(AppError);
      await expect(userService.update('non-existent-id', updateData)).rejects.toThrow('User not found');
    });

    it('should not update email if provided', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      const updateData: UpdateUserDto = {
        email: 'new@example.com',
        firstName: 'Jane',
      };

      const updated = await userService.update(user.id, updateData);
      expect(updated.email).toBe(user.email); // Email should not change
      expect(updated.firstName).toBe(updateData.firstName);
    });
  });

  describe('delete', () => {
    it('should delete user', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      await userService.delete(user.id);
      await expect(userService.findById(user.id)).rejects.toThrow('User not found');
    });

    it('should throw AppError if user not found', async () => {
      await expect(userService.delete('non-existent-id')).rejects.toThrow(AppError);
      await expect(userService.delete('non-existent-id')).rejects.toThrow('User not found');
    });
  });

  describe('toUserResponse', () => {
    it('should transform user to response format', async () => {
      const user = await userService.create({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      const response = userService.toUserResponse(user);
      expect(response.id).toBe(user.id);
      expect(response.email).toBe(user.email);
      expect(response.firstName).toBe(user.firstName);
      expect(response.lastName).toBe(user.lastName);
      expect(response.createdAt).toBe(user.createdAt);
      expect(response.updatedAt).toBe(user.updatedAt);
      expect(response).not.toHaveProperty('password');
    });
  });
}); 