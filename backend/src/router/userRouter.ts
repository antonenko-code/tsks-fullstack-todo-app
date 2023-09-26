import * as express from 'express';
import userController from '../controllers/userController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { forgotPasswordSchema } from '../validations/forgotPassword';

const router = express.Router();

router.get('/', AuthMiddleware, userController.getUser);
router.post('/forgot-password', forgotPasswordSchema, userController.requestPasswordReset)
router.get('/reset-password/:token', userController.verifyResetPasswordLink);
router.post('/reset-password/:token', userController.resetPassword);

export default router;
