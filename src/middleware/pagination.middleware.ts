import { query } from 'express-validator';

function pagination(defaultPageSize: number = 10) {
  return [
    query('_skip').customSanitizer((_, { req }) => {
      const _page = Math.abs(Number(req.query?._page || '0'));
      const _limit = Math.abs(Number(req.query?._limit || defaultPageSize.toString()));
      const _skip = (_page - 1) * _limit;
      return _skip;
    }),
    query('_limit').customSanitizer((value) => Math.abs(Number(value)) || defaultPageSize),
  ];
}

export default pagination;
