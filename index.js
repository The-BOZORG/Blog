import connectDB from './configs/dbConfig.js';
import express from 'express';
const app = express();

//packages
import cookieParser from 'cookie-parser';
import colors from 'colors';
import helmet from 'helmet';
import morgan from 'morgan';

//use packages
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());

//middlewares

//routes
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/post.js';

//user routes
app.use('/user', userRoute);
app.use('/auth', authRoute);
app.use('/post', postRoute);

//server
const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err.red);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception', err.red);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('SIGINT', async () => {
  console.error('SIGINT received, shutting down gracefully'.green);
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

connectDB();
