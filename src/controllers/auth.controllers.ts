import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import APIResponse from '../types/APIResponse';

const prisma = new PrismaClient();

export async function loginStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function registerStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
