import * as express from 'express';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { errorHandlerWrapper } from '../middlewares/errorsMiddleware';
import tasksController from '../controllers/tasksController';

const router = express.Router();

router.get('/collections/:id/tasks', AuthMiddleware, errorHandlerWrapper(tasksController.getTasks));
router.post('/collections/:id/tasks', AuthMiddleware, errorHandlerWrapper(tasksController.setTask));
router.patch('/collections/tasks/:id', AuthMiddleware, errorHandlerWrapper(tasksController.updateTask));
router.delete('/collections/tasks/:id', AuthMiddleware, errorHandlerWrapper(tasksController.deleteTask));

export default router;
