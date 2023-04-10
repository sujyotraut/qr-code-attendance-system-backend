import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import APIResponse from '../types/APIResponse.types';

const prisma = new PrismaClient();

export function getStudents(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function createStudent(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function getStudent(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function updateStudent(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function deleteStudent(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
