import { body, ValidationChain } from 'express-validator';

const updateUserSchema: ValidationChain[] = [
  body('firstName')
    .notEmpty()
    .withMessage('error.validation.firstname'),
  body('secondName')
    .notEmpty()
    .withMessage('error.validation.secondname'),
];

export { updateUserSchema };
