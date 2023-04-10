import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import APIResponse from '../types/APIResponse.types';

const prisma = new PrismaClient();

export async function loginStudent(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function registerStudent(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
