import { PrismaClient } from '@prisma/client';
import { Request } from 'express';
import { body, matchedData } from 'express-validator';
import validate from '../middleware/validate.middleware';
import APIResponse from '../types/APIResponse';
import ParamsWithID from '../types/ParamsWithID';
import UserFilter from '../types/UserFilter';

const prisma = new PrismaClient();

export async function getUsers(req: Request<any, any, any, UserFilter>, res: APIResponse) {
  const { _limit, _skip, _sort, _order } = matchedData(req, { locations: ['query'] });

  const query = req.query;
  const total = await prisma.user.count();

  const users = await prisma.user.findMany({
    skip: _skip,
    take: _limit,
    orderBy: { [_sort]: _order },
    where: {
      AND: [
        { id: { contains: query.id } },
        { name: { contains: query.name } },
        { email: { contains: query.email } },
        { username: { contains: query.username } },
        { role: { contains: query.role } },
      ],
    },
  });

  // Exclude password field from users
  const items = users.map((user) => {
    const { password, ...rest } = user;
    return rest;
  });

  res.json({ status: 'success', data: { total, items } });
}

export async function createUser(req: Request, res: APIResponse) {
  const userData = matchedData(req, { locations: ['body'] }) as any;
  const { password, ...data } = await prisma.user.create({ data: { ...userData, role: 'admin' } });
  res.status(201).json({ status: 'success', data });
}

export async function getUser(req: Request<ParamsWithID>, res: APIResponse) {
  const { password, ...data } = await prisma.user.findUniqueOrThrow({ where: { id: req.params.id } });
  res.json({ status: 'success', data });
}

export async function updateUser(req: Request<ParamsWithID>, res: APIResponse) {
  const userData = matchedData(req, { locations: ['body'] }) as any;
  const data = await prisma.user.update({ where: { id: req.params.id }, data: { ...userData, role: 'admin' } });
  res.json({ status: 'success', data });
}

export async function deleteUser(req: Request<ParamsWithID>, res: APIResponse) {
  await prisma.user.delete({ where: { id: req.params.id } });
  res.json({ status: 'success', data: {} });
}

// export function validateUser() {
//   return [
//     body('name').exists({ checkNull: true, checkFalsy: true }).isString(),
//     body('email').exists({ checkNull: true, checkFalsy: true }).isEmail(),
//     body('username').exists({ checkNull: true, checkFalsy: true }).isString(),
//     body('password').exists({ checkNull: true, checkFalsy: true }).isStrongPassword(),
//     validate,
//   ];
// }

export const validateUser = [
  body('name').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('email').exists({ checkNull: true, checkFalsy: true }).isEmail(),
  body('username').exists({ checkNull: true, checkFalsy: true }).isString(),
  body('password').exists({ checkNull: true, checkFalsy: true }).isStrongPassword(),
  validate,
];
