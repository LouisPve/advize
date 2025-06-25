import { HttpError } from './httpError';

export class ConflictError extends HttpError {
    constructor(message: string, statusCode: number = 409) {
        super(message, statusCode);
        this.name = 'ConflictError';
    }
}
