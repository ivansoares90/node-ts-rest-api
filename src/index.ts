import express from 'express';
import routes from '@/routes';
import config from '@/config';
import { errorHandler } from '@/middlewares/error.middleware';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 