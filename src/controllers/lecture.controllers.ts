import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import APIResponse from '../types/APIResponse.types';

const prisma = new PrismaClient();

export async function getLectures(req: Request, res: Response<APIResponse>) {
  const items = await prisma.lecture.findMany();
  const total = await prisma.lecture.count();
  res.status(200).json({ status: 'success', data: { total, items } });
}

export async function createLecture(req: Request, res: Response<APIResponse>) {
  const { qrExpireTime, ...lectureData } = matchedData(req);
  const lecture = await prisma.lecture.create({ data: lectureData as any });
  res.status(201).json({ status: 'success', data: lecture });
}

export async function getLecture(req: Request, res: Response<APIResponse>) {
  const lecture = await prisma.lecture.findUnique({ where: { id: req.params.id } });
  res.status(200).json({ status: 'success', data: lecture });
}

export function updateLecture(req: Request, res: Response<APIResponse>) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteLecture(req: Request, res: Response<APIResponse>) {
  await prisma.lecture.delete({ where: { id: req.params.id } });
  res.status(200).json({ status: 'success', data: {} });
}
