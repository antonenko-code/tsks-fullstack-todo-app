import * as express from 'express';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import collectionsController from '../controllers/collectionsController';

const router = express.Router();

router.get('/collections', AuthMiddleware, collectionsController.getCollections);
router.post('/collections', AuthMiddleware, collectionsController.setCollection);
router.patch('/collections/:id', AuthMiddleware, collectionsController.updateCollection);
router.delete('/collections/:id', AuthMiddleware, collectionsController.deleteCollection);

export default router;
