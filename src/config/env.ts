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
  
  // Database
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  
  // Logging
  logLevel: string;
}

// Validate required environment variables
const requiredEnvVars = [
  'PORT',
  'NODE_ENV',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
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
  
  // Database
  dbHost: process.env.DB_HOST!,
  dbPort: parseInt(process.env.DB_PORT!, 10),
  dbName: process.env.DB_NAME!,
  dbUser: process.env.DB_USER!,
  dbPassword: process.env.DB_PASSWORD!,
  
  // Logging
  logLevel: process.env.LOG_LEVEL!,
}; 