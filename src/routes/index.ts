import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' });
});

router.use('/api/health', healthRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);

export default router; 