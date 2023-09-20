import * as express from 'express';
import authController from '../controllers/authController';
import { registrationSchema, loginSchema } from '../validations/auth';

const router = express.Router();

router.post('/registration', registrationSchema, authController.registration);
router.post('/login', loginSchema, authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);
router.get('/activate/:link', authController.activate);

export default router;
