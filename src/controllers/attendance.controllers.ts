import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { matchedData } from 'express-validator';
import validate from '../middleware/validate.middleware';
import APIResponse from '../types/APIResponse';
import AttendanceFilter from '../types/AttendanceFilter';
import ParamsWithID from '../types/ParamsWithID';
import UserLocals from '../types/UserLocals';

const prisma = new PrismaClient();

export async function markAttendance(req: Request<{ lectureId: string }>, res: APIResponse<UserLocals>) {
  const lectureId = req.params.lectureId;
  const studentId = res.locals.user.id;

  const attendance = await prisma.attendance.upsert({
    where: { lectureId_studentId: { lectureId, studentId } },
    create: {
      present: true,
      lecture: { connect: { id: lectureId } },
      student: { connect: { id: studentId } },
    },
    update: {
      present: true,
      lecture: { connect: { id: lectureId } },
      student: { connect: { id: studentId } },
    },
  });

  res.json({ status: 'success', data: attendance });
}

export async function getAttendances(req: Request<any, any, any, AttendanceFilter>, res: APIResponse) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  const query = req.query;
  const total = await prisma.attendance.count();

  const items = await prisma.attendance.findMany({
    skip: _skip,
    take: _limit,
    orderBy: { [_sort]: _order },
    where: {
      AND: [{ id: { contains: query.id } }],
    },
  });

  res.json({ status: 'success', data: { total, items } });
}

export async function createAttendance(req: Request, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function getAttendance(req: Request<ParamsWithID>, res: APIResponse) {
  const data = await prisma.attendance.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json({ status: 'success', data });
}

export async function updateAttendance(req: Request<ParamsWithID>, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteAttendance(req: Request<ParamsWithID>, res: APIResponse) {
  await prisma.attendance.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
}

export const validateAttendance = [validate];
