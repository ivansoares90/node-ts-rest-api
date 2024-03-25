import { AppError } from '@/middlewares/error.middleware';
import { User, CreateUserDto, UpdateUserDto, UserResponse } from '@/types/user.types';
import { Store } from '@/utils/store';
import { generateId } from '@/utils/id';

export class UserService {
  private store: Store<User>;

  constructor() {
    this.store = new Store<User>();
  }

  public async findById(id: string): Promise<UserResponse> {
    const user = await this.store.findById(id);
    return this.toUserResponse(user);
  }

  public async findByEmail(email: string): Promise<UserResponse> {
    const user = await this.store.findOne((u) => u.email === email);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return this.toUserResponse(user);
  }

  public async create(data: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.store.findOne((u) => u.email === data.email);
    if (existingUser) {
      throw new AppError(409, 'User with this email already exists');
    }

    const user: User = {
      id: generateId(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.store.create(user.id, user);
    return this.toUserResponse(user);
  }

  public async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    const user = await this.store.findById(id);
    const updatedUser = await this.store.update(id, {
      ...data,
      updatedAt: new Date(),
    } as Partial<User>);
    return this.toUserResponse(updatedUser);
  }

  public async delete(id: string): Promise<void> {
    await this.store.delete(id);
  }

  public toUserResponse(user: User): UserResponse {
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