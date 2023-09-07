import * as express from 'express';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import tasksController from '../controllers/tasksController';

const router = express.Router();

router.get('/collections/:id/tasks', AuthMiddleware, tasksController.getTasks);
router.post('/collections/:id/tasks', AuthMiddleware, tasksController.setTask);
router.patch('/collections/tasks/:id', AuthMiddleware, tasksController.updateTask);
router.delete('/collections/tasks/:id', AuthMiddleware, tasksController.deleteTask);

export default router;
