import * as express from 'express';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import collectionsController from '../controllers/collectionsController';
import { errorHandlerWrapper } from '../middlewares/errorsMiddleware';

const router = express.Router();

router.get('/collections', AuthMiddleware, errorHandlerWrapper(collectionsController.getCollections));
router.post('/collections', AuthMiddleware, errorHandlerWrapper(collectionsController.setCollection));
router.patch('/collections/:id', AuthMiddleware, errorHandlerWrapper(collectionsController.updateCollection));
router.delete('/collections/:id', AuthMiddleware, errorHandlerWrapper(collectionsController.deleteCollection));

export default router;
