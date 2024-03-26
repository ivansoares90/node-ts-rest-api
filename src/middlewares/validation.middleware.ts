import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult, body, param, query } from 'express-validator';
import { AppError } from './error.middleware';

// Common validation rules
export const userValidationRules = {
  createUser: [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
      .withMessage('Password must contain at least one letter and one number'),
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage('First name is required')
      .isLength({ max: 50 })
      .withMessage('First name must not exceed 50 characters'),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage('Last name is required')
      .isLength({ max: 50 })
      .withMessage('Last name must not exceed 50 characters'),
  ],
  updateUser: [
    param('id').isUUID().withMessage('Invalid user ID'),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('firstName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('First name cannot be empty')
      .isLength({ max: 50 })
      .withMessage('First name must not exceed 50 characters'),
    body('lastName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage('Last name cannot be empty')
      .isLength({ max: 50 })
      .withMessage('Last name must not exceed 50 characters'),
  ],
  deleteUser: [
    param('id').isUUID().withMessage('Invalid user ID'),
  ],
  getUser: [
    param('id').isUUID().withMessage('Invalid user ID'),
  ],
};

export const authValidationRules = {
  login: [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
};

// Validation handler middleware
export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    // Format validation errors
    const formattedErrors = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg,
    }));

    const errorMessage = formattedErrors
      .map(error => `${error.field}: ${error.message}`)
      .join(', ');

    throw new AppError(400, errorMessage);
  };
}; 