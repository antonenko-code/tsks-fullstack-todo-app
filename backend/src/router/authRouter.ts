import express from 'express';
import authController from '../controllers/authController';
import registrationSchema from '../validations/auth';

const router = express.Router();

router.post('/registration', registrationSchema, authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

export default router;
