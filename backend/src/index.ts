import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { resolve } from 'path';
import authRouter from './router/authRouter';
import { errorsMiddleware } from './middlewares/errorsMiddleware';
dotenv.config({path: resolve(__dirname,"../.env")});

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/auth', authRouter);
app.use(errorsMiddleware)

const startServer = async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`)
    app.listen(PORT, () => {
      console.log(`Server started... on PORT = ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

startServer();
