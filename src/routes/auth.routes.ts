import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateJwt } from '@/middlewares/passport.middleware';
import { JwtPayload } from '@/types/auth.types';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login route (public)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // This is a mock login - in a real app, you would validate credentials
  if (email === 'test@example.com' && password === 'password') {
    const payload: JwtPayload = {
      userId: '123',
      email: 'test@example.com',
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256', // Explicitly specify the algorithm
    });

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