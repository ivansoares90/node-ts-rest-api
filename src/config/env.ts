import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Environment variable types
interface EnvConfig {
  // Server
  port: number;
  nodeEnv: string;
  
  // JWT
  jwtSecret: string;
  jwtExpiresIn: string;
  
  // MongoDB
  mongodbUri: string;
  mongodbUser: string;
  mongodbPassword: string;
  
  // Logging
  logLevel: string;
}

// Validate required environment variables
const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'MONGODB_URI',
  'LOG_LEVEL',
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Export typed environment configuration
export const env: EnvConfig = {
  // Server
  port: parseInt(process.env.PORT!, 10),
  nodeEnv: process.env.NODE_ENV!,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
  
  // MongoDB
  mongodbUri: process.env.MONGODB_URI!,
  mongodbUser: process.env.MONGODB_USER || '',
  mongodbPassword: process.env.MONGODB_PASSWORD || '',
  
  // Logging
  logLevel: process.env.LOG_LEVEL!,
}; 