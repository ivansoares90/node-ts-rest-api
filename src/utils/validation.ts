import { CreateUserDto, UpdateUserDto } from '@/types/user.types';
import { AppError } from '@/middlewares/error.middleware';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message);
    this.name = 'ValidationError';
  }
}

export function validateEmail(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }
}

export function validatePassword(password: string): void {
  if (password.length < 8) {
    throw new ValidationError('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    throw new ValidationError('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    throw new ValidationError('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    throw new ValidationError('Password must contain at least one number');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    throw new ValidationError('Password must contain at least one special character (!@#$%^&*)');
  }
}

export function validateName(name: string, field: string): void {
  if (!name || name.trim().length === 0) {
    throw new ValidationError(`${field} is required`);
  }
  if (name.length > 50) {
    throw new ValidationError(`${field} cannot be more than 50 characters`);
  }
}

export function validateCreateUser(data: CreateUserDto): void {
  validateEmail(data.email);
  validatePassword(data.password);
  validateName(data.firstName, 'First name');
  validateName(data.lastName, 'Last name');
}

export function validateUpdateUser(data: UpdateUserDto): void {
  if (data.email) {
    validateEmail(data.email);
  }
  if (data.password) {
    validatePassword(data.password);
  }
  if (data.firstName) {
    validateName(data.firstName, 'First name');
  }
  if (data.lastName) {
    validateName(data.lastName, 'Last name');
  }
} 