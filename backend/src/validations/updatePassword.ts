import { body, ValidationChain } from 'express-validator';

const updatePasswordSchema: ValidationChain[] = [
  body('password')
    .notEmpty()
    .withMessage('error.validation.password'),
  body('newPassword')
    .notEmpty()
    .withMessage('error.validation.newPassword')
  ];

export { updatePasswordSchema };
