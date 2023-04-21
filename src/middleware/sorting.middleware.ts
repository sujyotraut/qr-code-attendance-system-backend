import { query } from 'express-validator';
import ResourceType from '../types/ResourceType';

export const UserSortableFields = ['id', 'email', 'username', 'role'];
export const TeacherSortableFields = ['id', 'name'];
export const StudentSortableFields = ['id', 'studentId', 'rollNo', 'course', 'year', 'semester', 'branch'];
export const LectureSortableFields = ['id', 'course', 'year', 'semester', 'branch', 'subject', 'date', 'time'];
export const AttendanceSortableFields = ['id'];

function sorting(resourceType: ResourceType) {
  const sortableFields = getSortableFields(resourceType);
  return [
    query('_sort').customSanitizer((value) => (sortableFields.includes(value) ? value : 'id')),
    query('_order').customSanitizer((value) => (['asc', 'desc'].includes(value) ? value : 'asc')),
  ];
}

function getSortableFields(resourceType: ResourceType) {
  switch (resourceType) {
    case 'Student':
      return StudentSortableFields;
    case 'Teacher':
      return TeacherSortableFields;
    case 'Lecture':
      return LectureSortableFields;
    case 'Attendance':
      return AttendanceSortableFields;
    default:
      return UserSortableFields;
  }
}

export default sorting;
