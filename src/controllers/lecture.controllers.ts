import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import APIResponse from '../types/APIResponse';

const prisma = new PrismaClient();

export async function getLectures(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function createLecture(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function getLecture(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function updateLecture(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteLecture(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
