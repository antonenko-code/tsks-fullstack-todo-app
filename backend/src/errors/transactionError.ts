import ApiError from './apiError';

export default class TransactionError extends ApiError {
    constructor(message: string) {
        super(500, message);
    }
}
