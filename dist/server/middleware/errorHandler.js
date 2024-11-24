import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { MongooseError } from 'mongoose';
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Validation error',
            details: err.errors,
        });
    }
    if (err instanceof MongooseError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Database error',
            message: err.message,
        });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    });
};
