export const ValidationErrorMessages = {
  // Email validation
  email: {
    required: 'Email is required',
    invalid: 'Please enter a valid email address',
    empty: 'Email cannot be empty'
  },

  // Password validation
  password: {
    required: 'Password is required',
    empty: 'Password cannot be empty',
    minLength: 'Password must be at least 8 characters long',
    pattern: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  },

  // Name validation
  name: {
    required: (field: string) => `${field} is required`,
    empty: (field: string) => `${field} cannot be empty`,
    minLength: (field: string) => `${field} must be at least 2 characters long`,
    maxLength: (field: string) => `${field} cannot be more than 50 characters`,
    pattern: (field: string) => `${field} can only contain letters, spaces, hyphens, and apostrophes`
  },

  // ID validation
  id: {
    invalid: 'Invalid user ID'
  }
}; 