import { HttpError } from './httpError';

export class ServerError extends HttpError {
    constructor(message: string = 'Server error', statusCode: number = 500) {
        super(message, statusCode);
        this.name = 'ServerError';
    }
}
