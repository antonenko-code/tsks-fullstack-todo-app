import ApiError from './apiError';

export default class RegisterError extends ApiError{
  constructor(message: string) {
    super(400, message);
  }
}
