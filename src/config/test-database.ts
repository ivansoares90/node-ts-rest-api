import mongoose from 'mongoose';
import { logger } from '@/utils/logger';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const TEST_DB_NAME = 'test_db';

const getTestMongoUri = (): string => {
  return `${MONGODB_URI}/${TEST_DB_NAME}`;
};

const connectTestDB = async (): Promise<void> => {
  try {
    const uri = getTestMongoUri();
    const options = {
      autoIndex: true,
      maxPoolSize: 5, // Smaller pool size for tests
      serverSelectionTimeoutMS: 60000, // 60 seconds timeout for CI
      socketTimeoutMS: 60000, // 60 seconds socket timeout
      connectTimeoutMS: 60000, // 60 seconds connection timeout
      retryWrites: true,
      retryReads: true,
      w: 'majority',
    };

    await mongoose.connect(uri, options);
    logger.info('Test MongoDB connected successfully');

    // Handle connection errors after initial connection
    mongoose.connection.on('error', (err: Error) => {
      logger.error('Test MongoDB connection error:', err);
    });

    // Handle disconnection
    mongoose.connection.on('disconnected', () => {
      logger.warn('Test MongoDB disconnected. Attempting to reconnect...');
      setTimeout(connectTestDB, 5000);
    });
  } catch (error) {
    logger.error('Test MongoDB connection error:', error);
    throw error;
  }
};

const disconnectTestDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    logger.info('Test MongoDB connection closed');
  } catch (error) {
    logger.error('Error closing test MongoDB connection:', error);
    throw error;
  }
};

export { connectTestDB, disconnectTestDB }; 