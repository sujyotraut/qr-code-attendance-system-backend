import { query } from 'express-validator';

export const userSortableFields = ['id', 'email', 'username', 'role'];

function sorting(sortableFields: string[]) {
  return [
    query('_sort').customSanitizer((value) => (sortableFields.includes(value) ? value : 'id')),
    query('_order').customSanitizer((value) => (['asc', 'desc'].includes(value) ? value : 'asc')),
  ];
}

export default sorting;
