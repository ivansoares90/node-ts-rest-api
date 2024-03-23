import express from 'express';
import routes from '@/routes';
import { errorHandler } from '@/middlewares/error.middleware';
import passport from './passport';

export const createApp = (): express.Application => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(passport.initialize());

  // Routes
  app.use('/', routes);

  // Error handling
  app.use(errorHandler);

  return app;
}; 