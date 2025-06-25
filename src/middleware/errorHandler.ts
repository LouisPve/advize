import { HttpError } from '../errors/httpError';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: HttpError, _: Request, res: Response, __: NextFunction) {
    console.error(err);
    if ((err as HttpError & { type?: string }).type === 'entity.parse.failed') {
        res.status(400).json({ error: 'Invalid JSON payload' });
    } else {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal server error';
        res.status(statusCode).json({ error: message });
    }
}
