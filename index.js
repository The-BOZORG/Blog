import connectDB from './configs/dbConfig.js';
import express from 'express';
const app = express();

//packages
import colors from 'colors';
import helmet from 'helmet';
import morgan from 'morgan';

//middlewares

//routes

//user routes

//use packages
app.use(morgan('dev'));
app.use(helmet());

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
