import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@/services/auth.service';
import { CreateUserDto, LoginDto } from '@/types/auth.types';
import { UserService } from '@/services/user.service';
import { AppError } from '@/middlewares/error.middleware';

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

      // Create new user
      const user = await this.userService.create(userData);

      // Generate JWT token
      const { token } = await this.authService.login({
        email: userData.email,
        password: userData.password
      });

      res.status(201).json({
        success: true,
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData: LoginDto = req.body;

      // Authenticate user and get token
      const { token } = await this.authService.login(loginData);

      // Get user data without password
      const user = await this.userService.getByEmail(loginData.email);

      res.json({
        success: true,
        data: {
          user,
          token
        }
      });
    } catch (error) {
      next(error);
    }
  };
} 