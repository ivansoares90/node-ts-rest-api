import mongoose from 'mongoose';
import { env } from './env';

export async function connectToDatabase(): Promise<void> {
  try {
    const options: mongoose.ConnectOptions = {
      autoIndex: true, // Build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    // Add credentials if provided
    if (env.mongodbUser && env.mongodbPassword) {
      options.auth = {
        username: env.mongodbUser,
        password: env.mongodbPassword,
      };
    }

    await mongoose.connect(env.mongodbUri, options);

    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB');
    });

    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
} 