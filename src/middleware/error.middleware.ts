import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { NextFunction, Request } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import APIResponse from '../types/APIResponse';
import ApplicationError from '../utils/ApplicationError';

/*
In Express 4 we have to manually pass the error thrown in async function to the next function,
In Express 5 we no longer need to pass error to next function,
Unhandled promise rejections are automatically passed to error handler.
*/
function errorHandler(err: any, req: Request, res: APIResponse, next: NextFunction) {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  } else if (err instanceof ApplicationError) {
    res.status(err.status).json({ status: 'fail', message: err.message });
  } else if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        const field: string | undefined = (err.meta?.target as string[])[0];
        res.status(400).json({ status: 'fail', message: `Field '${field}' should be unique` });
        break;
      case 'P2025':
        res.status(404).json({ status: 'fail', message: (err.meta?.cause as string) || 'Resource not found' });
        break;
      default:
        res.status(400).json({ status: 'fail', message: 'Prisma known error' });
    }
  } else if (err instanceof PrismaClientUnknownRequestError) {
    res.status(400).json({ status: 'fail', message: 'Prisma unknown error' });
  } else if (err instanceof PrismaClientValidationError) {
    res.status(400).json({ status: 'fail', message: 'Prisma validation error' });
  } else res.status(500).json({ status: 'fail', message: 'An unexpected error occurred' });

  console.log(err);
}

export default errorHandler;
