import express from 'express';
import controller from '../controllers/authController';
import registrationSchema from '../validations/auth';

const router = express.Router();

router.post('/registration', registrationSchema, controller.registration);
router.post('/login', controller.login);
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');

export default router;
