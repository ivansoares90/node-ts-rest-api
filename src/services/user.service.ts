import { AppError } from '@/middlewares/error.middleware';
import { User, CreateUserDto, UpdateUserDto, UserResponse } from '@/types/user.types';

// Mock database - replace with real database in production
const users: User[] = [];

export class UserService {
  public async findById(id: string): Promise<UserResponse> {
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return this.toUserResponse(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return users.find(u => u.email === email);
  }

  public async create(userData: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError(409, 'Email already exists');
    }

    const now = new Date();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9), // Replace with proper ID generation
      ...userData,
      createdAt: now,
      updatedAt: now,
    };

    users.push(newUser);
    return this.toUserResponse(newUser);
  }

  public async update(id: string, updateData: UpdateUserDto): Promise<UserResponse> {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new AppError(404, 'User not found');
    }

    const updatedUser: User = {
      ...users[userIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    users[userIndex] = updatedUser;
    return this.toUserResponse(updatedUser);
  }

  public async delete(id: string): Promise<void> {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new AppError(404, 'User not found');
    }

    users.splice(userIndex, 1);
  }

  private toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
} 