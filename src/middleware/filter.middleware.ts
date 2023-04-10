import { NextFunction, Request } from 'express';
import APIResponse from '../types/APIResponse';

export const userFilterableFields = ['id', 'email', 'username', 'role'];

function filter(filterableFields: string[]) {
  return (req: Request, res: APIResponse, next: NextFunction) => {
    const filters = filterableFields.map((field) => ({ [field]: { contains: req.query[field] } }));
    res.locals.filters = filters;
    next();
  };
}

export default filter;
