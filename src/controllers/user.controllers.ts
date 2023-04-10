import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import APIResponse from '../types/APIResponse.types';

const prisma = new PrismaClient();

export function getUsers(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function createUser(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function getUser(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function updateUser(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export function deleteUser(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}
