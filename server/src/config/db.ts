import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Загрузка переменных окружения
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://timeevdanil3:5qxTOefKm02hEPgK@clusterdv.qi2mmwl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterDv';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`);
    process.exit(1);
  }
};

export default connectDB; 