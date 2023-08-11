import ApiError from './apiError';

export default class ValidationError extends ApiError {

  constructor(private _errors: any[], message: string = "") {
    super(400, message);
  }

  get errors(): any[] {
    return this._errors;
  }
}
