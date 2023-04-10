import { NextFunction, Request } from 'express';
import { validationResult } from 'express-validator';
import APIResponse from '../types/APIResponse';

function validate(req: Request, res: APIResponse, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  const firstError = errors.array()[0];
  const message = `Invalid value for '${firstError.param}'`;
  res.status(400).json({ status: 'fail', message });
}

export default validate;
