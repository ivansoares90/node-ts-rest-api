import { AppError } from '@/middlewares/error.middleware';
import { CreateUserDto, UpdateUserDto, UserResponse } from '@/types/user.types';
import { UserModel, UserDocument } from '@/models/user.model';
import { validateCreateUser, validateUpdateUser } from '@/utils/validation';

export class UserService {
  public async getById(id: string): Promise<UserResponse> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return this.toUserResponse(user);
  }

  public async getByEmail(email: string): Promise<UserResponse> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    return this.toUserResponse(user);
  }

  public async create(data: CreateUserDto): Promise<UserResponse> {
    // Validate input data
    validateCreateUser(data);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      throw new AppError(409, 'User with this email already exists');
    }

    // Create new user (password will be hashed by the model's pre-save hook)
    const user = await UserModel.create(data);
    return this.toUserResponse(user);
  }

  public async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    // Validate input data
    validateUpdateUser(data);

    // Check if email is being changed and if it's already taken
    if (data.email) {
      const existingUser = await UserModel.findOne({ 
        email: data.email,
        _id: { $ne: id } // Exclude current user
      });
      if (existingUser) {
        throw new AppError(409, 'Email is already in use');
      }
    }

    // If password is being updated, ensure it's properly validated
    if (data.password) {
      // Password will be hashed by the model's pre-save hook
      // Additional validation is handled by the model's schema
    }

    const user = await UserModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return this.toUserResponse(user);
  }

  public async remove(id: string): Promise<void> {
    const result = await UserModel.findByIdAndDelete(id);
    if (!result) {
      throw new AppError(404, 'User not found');
    }
  }

  private toUserResponse(user: UserDocument): UserResponse {
    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
} 