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

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.store.findOne(user => user.email === email);
  }

  public async create(userData: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError(409, 'Email already exists');
    }

    const id = generateId();
    const user = await this.store.create(id, userData);
    return this.toUserResponse(user);
  }

  public async update(id: string, updateData: UpdateUserDto): Promise<UserResponse> {
    const user = await this.store.update(id, updateData);
    return this.toUserResponse(user);
  }

  public async delete(id: string): Promise<void> {
    await this.store.delete(id);
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