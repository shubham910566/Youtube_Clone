import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Capstone';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
