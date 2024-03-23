import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { authenticateJwt } from '@/middlewares/passport.middleware';

const router = Router();
const userController = new UserController();

// All routes require authentication
router.use(authenticateJwt);

// Get user by ID
router.get('/:id', userController.getUser);

// Create new user (typically this would be public, but showing protected route example)
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

export default router; 