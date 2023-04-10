import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import APIResponse from '../types/APIResponse.types';

const prisma = new PrismaClient();

export function getAttendances(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function createAttendance(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function getAttendance(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function updateAttendance(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function deleteAttendance(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
