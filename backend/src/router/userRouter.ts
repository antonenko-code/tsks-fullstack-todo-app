import * as express from 'express';
import userController from '../controllers/userController';
import { AuthMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/users/:id', AuthMiddleware, userController.getUser);

export default router;
