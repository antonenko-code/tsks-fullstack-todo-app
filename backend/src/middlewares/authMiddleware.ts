import AuthError from '../errors/authError';
import tokenService from '../service/tokenService';
import { NextFunction, Response } from 'express';

export const AuthMiddleware = (req: any, _res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return next(new AuthError('Authentication Error'))
  }

  const accessToken = authorizationHeader.split(' ')[1];

  if (!accessToken) {
    return next(new AuthError('Authentication Error'))
  }

  const userData = tokenService.validateAccessToken(accessToken);

  if (!userData) {
    return next(new AuthError('Authentication Error'))
  }

  req.user = userData;
  next();
}
