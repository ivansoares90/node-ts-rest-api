import jwt, { SignOptions } from 'jsonwebtoken';
import { AppError } from '@/middlewares/error.middleware';
import { JwtPayload } from '@/types/auth.types';
import { env } from '@/config/env';

const JWT_SECRET = env.jwtSecret;
const JWT_EXPIRES_IN = env.jwtExpiresIn as jwt.SignOptions['expiresIn'];

export const generateToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  const options: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, 'Invalid token');
    }
    throw new AppError(401, 'Authentication failed');
  }
};

export const extractTokenFromHeader = (header: string): string => {
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    throw new AppError(401, 'Invalid authorization header');
  }
  return token;
}; 