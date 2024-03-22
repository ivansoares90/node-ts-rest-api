import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello World!' });
});

router.use('/api', healthRoutes);

export default router; 