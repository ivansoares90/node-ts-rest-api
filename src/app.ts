import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { devFormat, prodFormat } from '@/middlewares/logging.middleware';
import { errorHandler } from '@/middlewares/error.middleware';
import routes from '@/routes';

const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Compress responses
app.use(process.env.NODE_ENV === 'development' ? devFormat : prodFormat); // Request logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app; 