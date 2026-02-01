import connectDB from './configs/dbConfig.js';
import limiter from './utils/limiter.js';
import express from 'express';
const app = express();

//packages
import cookieParser from 'cookie-parser';
import colors from 'colors';
import helmet from 'helmet';
import morgan from 'morgan';

//use packages
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser(process.env.JWT_COOKIE_SECRET));
app.use(morgan('dev'));
app.use(helmet());

//middlewares
import errorHandler from './middlewares/errHandler.js';
import notFound from './middlewares/notFound.js';

//routes
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';
import postRoute from './routes/post.js';
import reviewRoute from './routes/review.js';

//user routes
app.use('/user', limiter, userRoute);
app.use('/auth', limiter, authRoute);
app.use('/post', postRoute);
app.use('/review', reviewRoute);

//use middlewares
app.use(errorHandler);
app.use(notFound);

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
