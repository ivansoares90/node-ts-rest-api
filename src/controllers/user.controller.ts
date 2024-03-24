import { Request, Response } from 'express';
import { UserService } from '@/services/user.service';
import { CreateUserDto, UpdateUserDto } from '@/types/user.types';
import { asyncHandler } from '@/middlewares/error.middleware';

export class UserController {
  constructor(private userService: UserService) {}

  findById = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.findById(req.params.id);
    res.json(user);
  });

  findByEmail = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.findByEmail(req.query.email as string);
    res.json(user);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body as CreateUserDto;
    const user = await this.userService.create(userData);
    res.status(201).json(user);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const userData = req.body as UpdateUserDto;
    const user = await this.userService.update(req.params.id, userData);
    res.json(user);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await this.userService.delete(req.params.id);
    res.status(204).send();
  });
} 