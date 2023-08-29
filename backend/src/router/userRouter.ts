import * as express from 'express';
import userController from '../controllers/userController';
import { AuthMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/users', AuthMiddleware, userController.getUsers);

export default router;
