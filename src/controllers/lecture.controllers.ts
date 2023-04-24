import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { body, matchedData } from 'express-validator';
import validate from '../middleware/validate.middleware';
import APIResponse from '../types/APIResponse';
import LectureFilter from '../types/LectureFilter';
import ParamsWithID from '../types/ParamsWithID';
import UserLocals from '../types/UserLocals';

const prisma = new PrismaClient();

export async function getLectures(req: Request<any, any, any, LectureFilter>, res: APIResponse) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  const query = req.query;
  const total = await prisma.lecture.count();

  const items = await prisma.lecture.findMany({
    skip: _skip,
    take: _limit,
    orderBy: { [_sort]: _order },
    where: {
      AND: [
        { id: { contains: query.id } },
        { course: { contains: query.course } },
        { year: { contains: query.year } },
        { semester: { contains: query.semester } },
        { branch: { contains: query.branch } },
        { subject: { contains: query.subject } },
        { date: { contains: query.date } },
        { time: { contains: query.time } },
        { duration: { contains: query.duration } },
      ],
    },
  });

  res.json({ status: 'success', data: { total, items } });
}

export async function createLecture(req: Request, res: APIResponse<UserLocals>) {
  const lectureData = matchedData(req, { locations: ['body'] }) as any;
  const lecture = await prisma.lecture.create({
    data: { ...lectureData, teacher: { connect: { id: res.locals.user.id } } },
  });

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
