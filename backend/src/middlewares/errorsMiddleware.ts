import { NextFunction, Request, RequestHandler, Response } from 'express';
import ValidationError from '../errors/validationError';
import ApiError from '../errors/apiError';

export const errorsMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) next();
  console.error(err);

  if (err instanceof ValidationError) {
    return res.status(err.status).json({success: false, message: err.message, errors: err.errors});
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({success: false, message: err.message});
  }

  return res.status(500).json({success: false, message: "Internal Server Error"})
}
