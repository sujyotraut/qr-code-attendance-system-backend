import express from 'express';
import {
  createStudent,
  deleteStudent,
  getStudent,
  getStudents,
  updateStudent,
} from '../controllers/student.controllers';

const studentRouter = express.Router();

studentRouter.get('/', getStudents);
studentRouter.post('/', createStudent);
studentRouter.get('/:id', getStudent);
studentRouter.put('/:id', updateStudent);
studentRouter.delete('/:id', deleteStudent);

export default studentRouter;
