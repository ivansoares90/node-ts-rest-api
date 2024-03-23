import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { AppError } from './error.middleware';

interface JwtUser {
  userId: string;
  email: string;
}

export const authenticateJwt = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', { session: false }, (err: Error | null, user: JwtUser | false) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(new AppError(401, 'Authentication failed'));
    }
    req.user = user;
    next();
  })(req, res, next);
}; 