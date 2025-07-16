import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
const SERVER_PORT = process.env.PORT;
const app = express();

//Global error handler
app.use(errorHandler);
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port - http://localhost:${SERVER_PORT}`);
});
