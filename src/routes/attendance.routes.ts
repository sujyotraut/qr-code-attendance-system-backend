import express from 'express';
import {
  createAttendance,
  deleteAttendance,
  getAttendance,
  getAttendances,
  markAttendance,
  updateAttendance,
  validateAttendance,
} from '../controllers/attendance.controllers';
import { requireStudent } from '../middleware/auth.middleware';
import pagination from '../middleware/pagination.middleware';
import sorting from '../middleware/sorting.middleware';

const attendanceRouter = express.Router();

attendanceRouter.post('/mark/:lectureId', requireStudent, markAttendance);
attendanceRouter.get('/', sorting('Attendance'), pagination(), getAttendances);
attendanceRouter.post('/', validateAttendance, createAttendance);
attendanceRouter.get('/:id', getAttendance);
attendanceRouter.put('/:id', validateAttendance, updateAttendance);
attendanceRouter.delete('/:id', deleteAttendance);

export default attendanceRouter;
