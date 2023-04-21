import express from 'express';
import {
  createAttendance,
  deleteAttendance,
  getAttendance,
  getAttendances,
  updateAttendance,
  validateAttendance,
} from '../controllers/attendance.controllers';
import pagination from '../middleware/pagination.middleware';
import sorting from '../middleware/sorting.middleware';

const attendanceRouter = express.Router();

attendanceRouter.get('/', sorting('Attendance'), pagination(), getAttendances);
attendanceRouter.post('/', validateAttendance, createAttendance);
attendanceRouter.get('/:id', getAttendance);
attendanceRouter.put('/:id', validateAttendance, updateAttendance);
attendanceRouter.delete('/:id', deleteAttendance);

export default attendanceRouter;
