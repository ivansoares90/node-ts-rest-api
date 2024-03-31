import { UserResponse } from './user.types';

export interface JwtPayload {
  userId: string;
  email: string;
  iat: number; // Issued at
  exp: number; // Expiration time
  jti?: string; // JWT ID
  sub?: string; // Subject
  aud?: string; // Audience
  iss?: string; // Issuer
}

export interface AuthUser extends JwtPayload {
  userId: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: UserResponse;
    token: string;
  };
} 