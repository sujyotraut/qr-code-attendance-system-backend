import { NextFunction, Request } from 'express';
import { UnauthorizedError } from 'express-oauth2-jwt-bearer';
import APIResponse from '../types/APIResponse';

/*
In Express 4 we have to manually pass the error thrown in async function to the next function,
In Express 5 we no longer need to pass error to next function,
Unhandled promise rejections are automatically passed to error handler.
*/
function errorHandler(err: any, req: Request, res: APIResponse, next: NextFunction) {
  if (err instanceof UnauthorizedError) res.status(401).json({ status: 'fail', message: 'Unauthorized' });
  else res.status(500).json({ status: 'fail', message: 'An unexpected error occurred' });
  console.log(err);
}

export default errorHandler;
