import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { authenticate } from '../middlewares/auth.middleware';
import { validate, userValidationRules } from '../middlewares/validation.middleware';

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

// All routes require JWT authentication
router.use(authenticate);

// User routes
router.get('/email', userController.findByEmail);
router.get('/:id', validate(userValidationRules.getUser), userController.findById);
router.post('/', validate(userValidationRules.createUser), userController.create);
router.put('/:id', validate(userValidationRules.updateUser), userController.update);
router.delete('/:id', validate(userValidationRules.deleteUser), userController.delete);

export default router; 