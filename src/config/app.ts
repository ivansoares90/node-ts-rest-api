import express from 'express';
import routes from '@/routes';
import { errorHandler } from '@/middlewares/error.middleware';

export const createApp = (): express.Application => {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  app.use('/', routes);

  // Error handling
  app.use(errorHandler);

  return app;
}; 