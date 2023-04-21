import { NextFunction } from 'express';
import APIResponse from '../types/APIResponse';
import UserLocals from '../types/UserLocals';

function sampleLogger(req: Request, res: APIResponse<UserLocals>, next: NextFunction) {
  console.log('Hello from sample middleware');
  next();
}

export default sampleLogger;
