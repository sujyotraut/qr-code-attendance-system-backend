import { NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import APIResponse from '../types/APIResponse';
import UserLocals from '../types/UserLocals';
import ForbiddenError from '../utils/ForbiddenError';
import UnauthorizedError from '../utils/UnauthorizedError';

export function requireAuth(req: Request, res: APIResponse, next: NextFunction) {
  // Check for authorization header
  const auth = req.headers.authorization;
  if (!auth) throw new UnauthorizedError();

  // Extract & verify token
  const token = auth.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    res.locals.user = user;
  } catch {
    throw new UnauthorizedError();
  }

  next();
}

export function requireAdmin(req: Request, res: APIResponse<UserLocals>, next: NextFunction) {
  requireAuth(req, res, () => {});
  if (res.locals.user.role === 'admin') next();
  else throw new ForbiddenError();
}

export function requireStudent(req: Request, res: APIResponse<UserLocals>, next: NextFunction) {
  requireAuth(req, res, () => {});
  if (res.locals.user.role === 'student') next();
  else throw new ForbiddenError();
}

export function requireTeacher(req: Request, res: APIResponse<UserLocals>, next: NextFunction) {
  requireAuth(req, res, () => {});
  if (res.locals.user.role === 'teacher') next();
  else throw new ForbiddenError();
}

export function requireAdminOrStudent(req: Request, res: APIResponse<UserLocals>, next: NextFunction) {
  requireAuth(req, res, () => {});
  if (res.locals.user.role === 'admin' || res.locals.user.role === 'student') next();
  else throw new ForbiddenError();
}

export function requireAdminOrTeacher(req: Request, res: APIResponse<UserLocals>, next: NextFunction) {
  requireAuth(req, res, () => {});
  if (res.locals.user.role === 'admin' || res.locals.user.role === 'teacher') next();
  else throw new ForbiddenError();
}
