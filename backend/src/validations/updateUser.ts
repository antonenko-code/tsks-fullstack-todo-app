import { body, ValidationChain } from 'express-validator';

const updateUserSchema: ValidationChain[] = [
  body('firstName')
    .optional()
    .notEmpty()
    .withMessage('error.validation.firstname'),
  body('secondName')
    .optional()
    .notEmpty()
    .withMessage('error.validation.secondname'),
];

export { updateUserSchema };
