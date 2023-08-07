import { body, ValidationChain } from 'express-validator';
import User from '../models/User';

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
    .normalizeEmail()
    .custom((value) => {
      return User.findOne({ email: value }).then((user) => {
        if (user) {
          return Promise.reject('User with this email already exists');
        }
      });
    }),
];

export default registrationSchema;
