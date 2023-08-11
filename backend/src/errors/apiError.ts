export default class ApiError extends Error {
  constructor(private _status: number, message: string) {
    super(message);
  }

  get status(): number {
    return this._status;
  }
}
