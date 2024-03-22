import { Router } from 'express';
import { generateToken } from '@/utils/jwt';
import { authenticate } from '@/middlewares/auth.middleware';

const router = Router();

// Login route (public)
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // This is a mock login - in a real app, you would validate credentials
  if (email === 'test@example.com' && password === 'password') {
    const token = generateToken({
      userId: '123',
      email: 'test@example.com',
    });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route example
router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully',
    user: req.user,
  });
});

export default router; 