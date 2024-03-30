import { AppError } from '@/middlewares/error.middleware';
import { UserModel } from '@/models/user.model';
import { generateToken } from '@/utils/jwt';
import { LoginDto } from '@/types/auth.types';

export class AuthService {
  public async login(data: LoginDto): Promise<{ token: string }> {
    // Find user and explicitly select password field
    const user = await UserModel.findOne({ email: data.email }).select('+password');
    if (!user) {
      throw new AppError(401, 'Invalid email or password');
    }

    // Compare password using the model's method
    const isPasswordValid = await user.comparePassword(data.password);
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      id: user._id.toString(),
      email: user.email
    });

    return { token };
  }
} 