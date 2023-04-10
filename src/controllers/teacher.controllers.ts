import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import APIResponse from '../types/APIResponse.types';

const prisma = new PrismaClient();

export function getTeachers(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function createTeacher(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function getTeacher(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function updateTeacher(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function deleteTeacher(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
