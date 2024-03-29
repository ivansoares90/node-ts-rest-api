import mongoose from 'mongoose';
import { logger } from '@/utils/logger';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

if (!MONGODB_URI || !MONGODB_DB_NAME || !MONGODB_USER || !MONGODB_PASSWORD) {
  throw new Error('Missing required MongoDB environment variables');
}

const getMongoUri = (): string => {
  const uri = MONGODB_URI.replace('<dbname>', MONGODB_DB_NAME);
  return uri.replace('<username>:<password>', `${MONGODB_USER}:${MONGODB_PASSWORD}`);
};

const connectDB = async (): Promise<void> => {
  try {
    const uri = getMongoUri();
    const options = {
      autoIndex: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // Increase from 5000 to 30000
      socketTimeoutMS: 45000, // Add socket timeout
      connectTimeoutMS: 30000, // Add connection timeout
      retryWrites: true, // Enable retry for write operations
      retryReads: true, // Enable retry for read operations
      w: 'majority', // Write concern for better consistency
    };

    await mongoose.connect(uri, options);
    logger.info('MongoDB connected successfully');

    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
      setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        logger.error('Error during MongoDB connection closure:', err);
        process.exit(1);
      }
    });
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    throw error;
  }
};

export default connectDB; 