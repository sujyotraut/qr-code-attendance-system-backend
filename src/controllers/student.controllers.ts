import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import APIResponse from '../types/APIResponse';

const prisma = new PrismaClient();

export async function getStudents(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function createStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function getStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function updateStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
