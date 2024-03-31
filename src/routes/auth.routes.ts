import { Router } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { authenticateJwt } from '../middlewares/passport.middleware';
import { JwtPayload } from '../types/auth.types';
import { validate, authValidationRules } from '../middlewares/validation.middleware';
import { env } from '../config/env';
import { AuthController } from '@/controllers/auth.controller';
import { validateRequest } from '@/middlewares/validation.middleware';
import { loginSchema, registerSchema } from '@/validations/auth.validation';

const router = Router();
const authController = new AuthController();

// Register new user
router.post(
  '/register',
  validateRequest(registerSchema),
  authController.register
);

// Login user
router.post(
  '/login',
  validateRequest(loginSchema),
  authController.login
);

// Login route (public)
router.post('/login', validate(authValidationRules.login), (req, res) => {
  const { email, password } = req.body;

  // This is a mock login - in a real app, you would validate credentials
  if (email === 'test@example.com' && password === 'password') {
    const now = Math.floor(Date.now() / 1000);
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      userId: '123',
      email: 'test@example.com',
    };

    const options: SignOptions = {
      expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
      algorithm: 'HS256', // Explicitly specify the algorithm
    };

    const token = jwt.sign(payload, env.jwtSecret, options);

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route example
router.get('/profile', authenticateJwt, (req, res) => {
  // At this point, req.user is properly typed thanks to the global declaration
  res.json({
    message: 'Protected route accessed successfully',
    user: req.user,
  });
});

export default router; 