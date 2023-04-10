import { NextFunction, Request, Response } from 'express';
import APIResponse from '../types/APIResponse.types';

export function requireAuth(req: Request, res: Response<APIResponse>, next: NextFunction) {
  // Check for authorization header
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ status: 'fail', message: 'Unauthorized' });

  // Extract & verify token
  const token = auth.split('s')[1];
  const user = { id: '123' }; // Verify token and get user
  if (!user) return res.status(401).json({ status: 'fail', message: 'Unauthorized' });

  res.locals.user = user;
  next();
}

export function requireAdmin(req: Request, res: Response<APIResponse>, next: NextFunction) {
  requireAuth(req, res, () => {
    if (res.locals.user.role === 'admin') next();
    else res.status(403).json({ status: 'fail', message: 'Forbidden' });
  });
}

export function requireStudent(req: Request, res: Response<APIResponse>, next: NextFunction) {
  requireAuth(req, res, () => {
    if (res.locals.user.role === 'student') next();
    else res.status(403).json({ status: 'fail', message: 'Forbidden' });
  });
}

export function requireTeacher(req: Request, res: Response<APIResponse>, next: NextFunction) {
  requireAuth(req, res, () => {
    if (res.locals.user.role === 'teacher') next();
    else res.status(403).json({ status: 'fail', message: 'Forbidden' });
  });
}

export function requireAdminOrStudent(req: Request, res: Response<APIResponse>, next: NextFunction) {
  requireAuth(req, res, () => {
    if (res.locals.user.role === 'admin' || res.locals.user.role === 'student') next();
    else res.status(403).json({ status: 'fail', message: 'Forbidden' });
  });
}

export function requireAdminOrTeacher(req: Request, res: Response<APIResponse>, next: NextFunction) {
  requireAuth(req, res, () => {
    if (res.locals.user.role === 'admin' || res.locals.user.role === 'teacher') next();
    else res.status(403).json({ status: 'fail', message: 'Forbidden' });
  });
}
