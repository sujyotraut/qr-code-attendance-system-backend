import express from 'express';
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
  validateTeacher,
} from '../controllers/teacher.controllers';
import pagination from '../middleware/pagination.middleware';
import sorting from '../middleware/sorting.middleware';

const teacherRouter = express.Router();

teacherRouter.get('/', sorting('Teacher'), pagination(), getTeachers);
teacherRouter.post('/', validateTeacher, createTeacher);
teacherRouter.get('/:id', getTeacher);
teacherRouter.put('/:id', validateTeacher, updateTeacher);
teacherRouter.delete('/:id', deleteTeacher);

export default teacherRouter;
