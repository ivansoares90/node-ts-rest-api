import { Router } from 'express';
import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { authenticate } from '@/middlewares/auth.middleware';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// All routes require JWT authentication
router.use(authenticate);

// User routes
router.get('/email', userController.findByEmail);
router.get('/:id', userController.findById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router; 