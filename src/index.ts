import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routes/auth.routes';
const SERVER_PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

//routes
app.use("/api/v1/auth" , authRouter)

//Global error handler
app.use(errorHandler);
app.listen(SERVER_PORT, () => {
  console.log(process.env.DATABASE_URL);
  console.log(`Server is running on port - http://localhost:${SERVER_PORT}`);
});
