import express from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
  validateStudent,
} from '../controllers/student.controllers';
import sorting from '../middleware/sorting.middleware';
import pagination from '../middleware/pagination.middleware';

const studentRouter = express.Router();

studentRouter.get('/', sorting('Student'), pagination(), getStudents);
studentRouter.post('/', validateStudent, createStudent);
studentRouter.get('/:id', getStudent);
studentRouter.put('/:id', validateStudent, updateStudent);
studentRouter.delete('/:id', deleteStudent);

export default studentRouter;
