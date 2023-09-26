import { body, ValidationChain } from 'express-validator';

const forgotPasswordSchema: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('error.validation.email'),
];

export { forgotPasswordSchema };
