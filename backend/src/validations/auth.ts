import { body, ValidationChain } from 'express-validator';

const registrationSchema: ValidationChain[] = [
  body('firstName')
    .notEmpty()
    .withMessage('error.validation.firstname'),
  body('secondName')
    .notEmpty()
    .withMessage('error.validation.secondname'),
  body('password')
    .notEmpty()
    .withMessage('error.validation.password'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('error.validation.email'),
];

const loginSchema: ValidationChain[] = [
  body('password')
    .notEmpty()
    .withMessage('error.validation.password'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('error.validation.email'),
];

export { registrationSchema, loginSchema };
