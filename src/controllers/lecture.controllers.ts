import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { body, matchedData } from 'express-validator';
import validate from '../middleware/validate.middleware';
import APIResponse from '../types/APIResponse';
import ParamsWithID from '../types/ParamsWithID';
import UserLocals from '../types/UserLocals';

const prisma = new PrismaClient();

export async function getLectures(req: Request<any, any, any, any>, res: APIResponse<{ user: { id: string } }>) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  let where: any = {};
  if (req.query && req.query.q && req.query.q.trim() !== '') {
    where = {
      OR: [
        { id: { startsWith: req.query.q } },
        { course: { startsWith: req.query.q } },
        { year: { startsWith: req.query.q } },
        { semester: { startsWith: req.query.q } },
        { branch: { startsWith: req.query.q } },
        { subject: { startsWith: req.query.q } },
        { date: { startsWith: req.query.q } },
        { time: { startsWith: req.query.q } },
        { duration: { startsWith: req.query.q } },
      ],
    };
  }

  const total = await prisma.lecture.count();
  const items = await prisma.lecture.findMany({
    skip: _skip,
    take: _limit,
    orderBy: { [_sort]: _order },
    where: { ...where, teacherId: res.locals.user.id },
  });

  res.json({ status: 'success', data: { total, items } });
}

export async function createLecture(req: Request, res: APIResponse<UserLocals>) {
  const lectureData = matchedData(req, { locations: ['body'] }) as any;
  const lecture = await prisma.lecture.create({
    data: { ...lectureData, teacher: { connect: { id: res.locals.user.id } } },
  });

  const students = await prisma.student.findMany({
    where: { course: lecture.course, branch: lecture.branch, year: lecture.year, semester: lecture.semester },
  });

  console.log(students);
  for (const { id } of students) {
    await prisma.attendance.create({ data: { lectureId: lecture.id, studentId: id } });
  }

  res.setHeader('Location', `/attendances/mark/${lecture.id}`);
  res.status(201).json({ status: 'success', data: lecture });
}

export async function getLecture(req: Request<ParamsWithID>, res: APIResponse) {
  const data = await prisma.lecture.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json({ status: 'success', data });
}

export async function updateLecture(req: Request<ParamsWithID>, res: APIResponse) {
  res.status(501).json({ status: 'fail', message: 'Route not implemented' });
}

export async function deleteLecture(req: Request<ParamsWithID>, res: APIResponse) {
  await prisma.lecture.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
}

export async function getLectureAttendances(req: Request<{ id: string }>, res: APIResponse) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  const query = req.query as any;
  const total = await prisma.attendance.count({ where: { lectureId: req.params.id } });

  const { attendances } = await prisma.lecture.findUniqueOrThrow({
    where: { id: req.params.id },
    include: {
      attendances: {
        skip: _skip,
        take: _limit,
        orderBy: { student: { rollNo: _order } },
        include: { student: { include: { user: true } } },
      },
    },
  });

  const items = attendances.map(
    ({
      id,
      present,
      student: {
        rollNo,
        user: { name },
      },
    }) => ({ id, name, rollNo, present: present ? 'Present' : 'Absent' })
  );

  // const items = await prisma.attendance.findMany({
  //   skip: _skip,
  //   take: _limit,
  //   orderBy: { [_sort]: _order },
  //   where: {
  //     lectureId: req.params.id,
  //     OR: [{ id: { startsWith: query.q } }],
  //   },
  // });

  res.json({ status: 'success', data: { total, items } });
}

export const validateLecture = [
  body('course').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('year').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('semester').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('branch').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('subject').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('date').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('time').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('duration').exists({ checkNull: true, checkFalsy: true }).isString(),
  validate,
];
