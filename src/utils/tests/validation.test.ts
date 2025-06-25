import { ServerError } from '../../errors/ServerError';
import { BadRequestError } from '../../errors/BadRequestError';
import { validateRoute } from '../validation';
import { Request, Response } from 'express';
import { pick } from '../object';

afterEach(() => {
    jest.clearAllMocks();
});
test('validateRoute', () => {
    const req: Request = {
        body: { key: 'value' },
        params: { id: '123' },
        query: { search: 'test' },
    } as unknown as Request;
    const res = {
        status: jest.fn(),
        json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();
    const validator = jest.fn();

    validateRoute(req, res, next, validator);
    const status = jest.spyOn(res, 'status').mockReturnThis();
    expect(validator).toHaveBeenCalledWith(pick(req, 'body', 'params', 'query'));
    expect(next).toHaveBeenCalled();
    expect(status).not.toHaveBeenCalled();
});
test('validateRoute - error handling', () => {
    const req: Request = {
        body: { key: 'value' },
        params: { id: '123' },
        query: { search: 'test' },
    } as unknown as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();
    const validator = jest.fn(() => {
        throw new ServerError('Validation error');
    });

    validateRoute(req, res, next, validator);
    const status = jest.spyOn(res, 'status').mockReturnThis();
    expect(validator).toHaveBeenCalledWith(pick(req, 'body', 'params', 'query'));
    expect(next).not.toHaveBeenCalled();
    expect(status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
});

test('validateRoute - BadRequestError handling', () => {
    const req: Request = {
        body: { key: 'value' },
        params: { id: '123' },
        query: { search: 'test' },
    } as unknown as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();
    const validator = jest.fn(() => {
        throw new BadRequestError('BadRequestError');
    });
    validateRoute(req, res, next, validator);
    expect(validator).toHaveBeenCalledWith(pick(req, 'body', 'params', 'query'));
    expect(next).not.toHaveBeenCalled();
    const status = jest.spyOn(res, 'status').mockReturnThis();
    expect(status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'BadRequestError' });
});
