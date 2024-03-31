import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty'
    })
});

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty'
    }),
  firstName: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s-']+$/)
    .messages({
      'string.min': 'First name must be at least 2 characters long',
      'string.max': 'First name cannot be more than 50 characters',
      'string.pattern.base': 'First name can only contain letters, spaces, hyphens, and apostrophes',
      'any.required': 'First name is required',
      'string.empty': 'First name cannot be empty'
    }),
  lastName: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s-']+$/)
    .messages({
      'string.min': 'Last name must be at least 2 characters long',
      'string.max': 'Last name cannot be more than 50 characters',
      'string.pattern.base': 'Last name can only contain letters, spaces, hyphens, and apostrophes',
      'any.required': 'Last name is required',
      'string.empty': 'Last name cannot be empty'
    })
}); 