import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer | null = null;

export async function connectDB(): Promise<void> {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    // Create indexes
    await Promise.all([
      mongoose.connection.collection('expenses').createIndex({ date: -1 }),
      mongoose.connection.collection('expenses').createIndex({ category: 1 }),
      mongoose.connection.collection('budgets').createIndex({ category: 1 }, { unique: true })
    ]);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
    throw error;
  }
}