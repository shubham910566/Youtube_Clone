import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

import { MONGO_URI } from '../config.js';



const connectDB = async () => {
  console.log("Connecting to:", MONGO_URI);
  try {
    await mongoose.connect(MONGO_URI);

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
