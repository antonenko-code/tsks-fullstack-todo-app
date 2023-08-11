import ApiError from './apiError';

export default class AuthError extends ApiError{
  constructor(message: string) {
    super(401, message);
  }
}
