import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected: ${connect.connection.host}`.cyan.underline.bold,
    );
  } catch (error) {
    console.log(error.red);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected'.cyan.underline.bold);
  } catch (error) {
    console.log(error.red);
  }
};

export { connectDB, disconnectDB };
