import helmet from 'helmet';
import cors from 'cors';
import { Express } from 'express';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];

export const configureMiddleware = (app: Express): void => {
  // Basic security headers with Helmet
  app.use(helmet());

  // Configure CORS
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 hours
  }));

  // Additional security headers
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin']
    }
  }));

  // Prevent clickjacking
  app.use(helmet.frameguard({ action: 'deny' }));

  // Hide X-Powered-By header
  app.use(helmet.hidePoweredBy());

  // Prevent MIME type sniffing
  app.use(helmet.noSniff());

  // Enable XSS filter
  app.use(helmet.xssFilter());
}; 