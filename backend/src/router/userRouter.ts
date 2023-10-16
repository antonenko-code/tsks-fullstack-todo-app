import * as express from 'express';
import userController from '../controllers/userController';
import { AuthMiddleware } from '../middlewares/authMiddleware';
import { forgotPasswordSchema } from '../validations/forgotPassword';
import { updateUserSchema } from '../validations/updateUser';
import { updateEmailSchema } from '../validations/updateEmail';
import { updatePasswordSchema } from '../validations/updatePassword';

const router = express.Router();

router.get('/', AuthMiddleware, userController.getUser);
router.post('/forgot-password', forgotPasswordSchema, userController.requestPasswordReset)
router.get('/reset-password/:token', userController.verifyResetPasswordLink);
router.post('/reset-password/:token', userController.resetPassword);
router.patch('/', updateUserSchema, AuthMiddleware, userController.updateUser);
router.patch('/email', updateEmailSchema, AuthMiddleware, userController.updateUserEmail);
router.patch('/password', updatePasswordSchema, AuthMiddleware,userController.updateUserPassword);

export default router;
