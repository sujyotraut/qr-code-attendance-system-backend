import express from 'express';
import {
  createTeacher,
  deleteTeacher,
  getTeacher,
  getTeachers,
  updateTeacher,
} from '../controllers/teacher.controllers';

const teacherRouter = express.Router();

teacherRouter.get('/', getTeachers);
teacherRouter.post('/', createTeacher);
teacherRouter.get('/:id', getTeacher);
teacherRouter.put('/:id', updateTeacher);
teacherRouter.delete('/:id', deleteTeacher);

export default teacherRouter;
