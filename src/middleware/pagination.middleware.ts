import { query } from 'express-validator';

function pagination(defaultPageSize: number = 10) {
  return [
    query('_skip').customSanitizer((value) => Math.abs(Number(value)) || 0),
    query('_limit').customSanitizer((value) => Math.abs(Number(value)) || defaultPageSize),
  ];
}

export default pagination;
