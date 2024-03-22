import { Router } from 'express';
import healthRoutes from './health.routes';
import authRoutes from './auth.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' });
});

router.use('/api/health', healthRoutes);
router.use('/api/auth', authRoutes);

export default router; 