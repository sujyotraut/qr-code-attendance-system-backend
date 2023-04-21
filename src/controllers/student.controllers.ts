import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { matchedData } from 'express-validator';
import validate from '../middleware/validate.middleware';
import APIResponse from '../types/APIResponse';
import ParamsWithID from '../types/ParamsWithID';
import StudentFilter from '../types/StudentFilter';

const prisma = new PrismaClient();

export async function getStudents(req: Request<any, any, any, StudentFilter>, res: APIResponse) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  const query = req.query;
  const total = await prisma.student.count();

  const items = await prisma.student.findMany({
    skip: _skip,
    take: _limit,
    orderBy: { [_sort]: _order },
    where: {
      AND: [
        { id: { contains: query.id } },
        { studentId: { contains: query.studentId } },
        { dateOfBirth: { contains: query.dateOfBirth } },
        { course: { contains: query.course } },
        { year: { contains: query.year } },
        { semester: { contains: query.semester } },
        { branch: { contains: query.branch } },
        { rollNo: { contains: query.rollNo } },
      ],
    },
  });

  res.json({ status: 'success', data: { total, items } });
}

export async function createStudent(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function getStudent(req: Request<ParamsWithID>, res: APIResponse) {
  const data = await prisma.student.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json({ status: 'success', data });
}

export async function updateStudent(req: Request<ParamsWithID>, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteStudent(req: Request<ParamsWithID>, res: APIResponse) {
  await prisma.student.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
}

export const validateStudent = [validate];
