import express from 'express';
import mongoose from 'mongoose';
import authRouter from './router/authRouter';

const app = express();
app.use(express.json())
app.use('/auth', authRouter);

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://userAdmin:userPassword@localhost:27017/todoapp?authSource=admin')
    app.listen(8080, () => {
      console.log(`Server sarted...`)
    })
    app.get('/', (req, res) => {
      res.send('Hello World');
    })
  } catch (e) {
    console.log(e)
  }
}

startServer();
