import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { matchedData } from 'express-validator';
import validate from '../middleware/validate.middleware';
import APIResponse from '../types/APIResponse';
import ParamsWithID from '../types/ParamsWithID';
import TeacherFilter from '../types/TeacherFilter';

const prisma = new PrismaClient();

export async function getTeachers(req: Request<any, any, any, TeacherFilter>, res: APIResponse) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  const query = req.query;
  const total = await prisma.teacher.count();

  const items = await prisma.teacher.findMany({
    skip: _skip,
    take: _limit,
    orderBy: { [_sort]: _order },
    where: {
      AND: [{ id: { contains: query.id } }],
    },
  });

  res.json({ status: 'success', data: { total, items } });
}

export async function createTeacher(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function getTeacher(req: Request<ParamsWithID>, res: APIResponse) {
  const data = await prisma.teacher.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json({ status: 'success', data });
}

export async function updateTeacher(req: Request<ParamsWithID>, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteTeacher(req: Request<ParamsWithID>, res: APIResponse) {
  await prisma.teacher.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
}

export const validateTeacher = [validate];
