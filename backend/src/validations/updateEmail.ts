import { body, ValidationChain } from 'express-validator';

const updateEmailSchema: ValidationChain[] = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('error.validation.email'),
  body('password')
    .notEmpty()
    .withMessage('error.validation.password'),
];

export {updateEmailSchema}
