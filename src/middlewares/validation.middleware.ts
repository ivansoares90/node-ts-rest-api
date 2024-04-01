import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult, body, param, query } from 'express-validator';
import { AppError } from './error.middleware';
import Joi from 'joi';
import { ValidationErrorMessages } from '@/constants/error.messages';

// Common validation rules
export const userValidationRules = {
  createUser: [
    body('email')
      .trim()
      .isEmail()
      .withMessage(ValidationErrorMessages.email.invalid)
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage(ValidationErrorMessages.password.minLength)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
      .withMessage(ValidationErrorMessages.password.pattern),
    body('firstName')
      .trim()
      .notEmpty()
      .withMessage(ValidationErrorMessages.name.required('First name'))
      .isLength({ min: 2, max: 50 })
      .withMessage(ValidationErrorMessages.name.minLength('First name'))
      .matches(/^[a-zA-Z\s-']+$/)
      .withMessage(ValidationErrorMessages.name.pattern('First name')),
    body('lastName')
      .trim()
      .notEmpty()
      .withMessage(ValidationErrorMessages.name.required('Last name'))
      .isLength({ min: 2, max: 50 })
      .withMessage(ValidationErrorMessages.name.minLength('Last name'))
      .matches(/^[a-zA-Z\s-']+$/)
      .withMessage(ValidationErrorMessages.name.pattern('Last name')),
  ],
  updateUser: [
    param('id').isUUID().withMessage(ValidationErrorMessages.id.invalid),
    body('email')
      .optional()
      .trim()
      .isEmail()
      .withMessage(ValidationErrorMessages.email.invalid)
      .normalizeEmail(),
    body('firstName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage(ValidationErrorMessages.name.empty('First name'))
      .isLength({ min: 2, max: 50 })
      .withMessage(ValidationErrorMessages.name.minLength('First name'))
      .matches(/^[a-zA-Z\s-']+$/)
      .withMessage(ValidationErrorMessages.name.pattern('First name')),
    body('lastName')
      .optional()
      .trim()
      .notEmpty()
      .withMessage(ValidationErrorMessages.name.empty('Last name'))
      .isLength({ min: 2, max: 50 })
      .withMessage(ValidationErrorMessages.name.minLength('Last name'))
      .matches(/^[a-zA-Z\s-']+$/)
      .withMessage(ValidationErrorMessages.name.pattern('Last name')),
  ],
  deleteUser: [
    param('id').isUUID().withMessage(ValidationErrorMessages.id.invalid),
  ],
  getUser: [
    param('id').isUUID().withMessage(ValidationErrorMessages.id.invalid),
  ],
};

export const authValidationRules = {
  login: [
    body('email')
      .trim()
      .isEmail()
      .withMessage(ValidationErrorMessages.email.invalid)
      .normalizeEmail(),
    body('password')
      .notEmpty()
      .withMessage(ValidationErrorMessages.password.required),
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

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      next(new AppError(400, errorMessages.join(', ')));
    } else {
      next();
    }
  };
}; 