import ApiError from './apiError';

export default class ResponseError extends ApiError {
  constructor(message: string) {
    super(404, message);
  }
}
