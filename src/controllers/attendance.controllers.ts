import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import APIResponse from '../types/APIResponse';

const prisma = new PrismaClient();

export async function getAttendances(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function createAttendance(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function getAttendance(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function updateAttendance(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteAttendance(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
