import Joi from 'joi';
import { ValidationErrorMessages } from '../constants/error.messages';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': ValidationErrorMessages.email.invalid,
      'any.required': ValidationErrorMessages.email.required,
      'string.empty': ValidationErrorMessages.email.empty
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': ValidationErrorMessages.password.minLength,
      'string.pattern.base': ValidationErrorMessages.password.pattern,
      'any.required': ValidationErrorMessages.password.required,
      'string.empty': ValidationErrorMessages.password.empty
    })
});

export const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': ValidationErrorMessages.email.invalid,
      'any.required': ValidationErrorMessages.email.required,
      'string.empty': ValidationErrorMessages.email.empty
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .required()
    .messages({
      'string.min': ValidationErrorMessages.password.minLength,
      'string.pattern.base': ValidationErrorMessages.password.pattern,
      'any.required': ValidationErrorMessages.password.required,
      'string.empty': ValidationErrorMessages.password.empty
    }),
  firstName: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s-']+$/)
    .messages({
      'string.min': ValidationErrorMessages.name.minLength('First name'),
      'string.max': ValidationErrorMessages.name.maxLength('First name'),
      'string.pattern.base': ValidationErrorMessages.name.pattern('First name'),
      'any.required': ValidationErrorMessages.name.required('First name'),
      'string.empty': ValidationErrorMessages.name.empty('First name')
    }),
  lastName: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s-']+$/)
    .messages({
      'string.min': ValidationErrorMessages.name.minLength('Last name'),
      'string.max': ValidationErrorMessages.name.maxLength('Last name'),
      'string.pattern.base': ValidationErrorMessages.name.pattern('Last name'),
      'any.required': ValidationErrorMessages.name.required('Last name'),
      'string.empty': ValidationErrorMessages.name.empty('Last name')
    })
}); 