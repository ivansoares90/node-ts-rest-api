import express from 'express';
import routes from '@/routes';
import config from '@/config';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
}); 