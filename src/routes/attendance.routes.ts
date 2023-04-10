import express from 'express';
import {
  createAttendance,
  deleteAttendance,
  getAttendance,
  getAttendances,
  updateAttendance,
} from '../controllers/attendance.controllers';

const attendanceRouter = express.Router();

attendanceRouter.get('/', getAttendances);
attendanceRouter.post('/', createAttendance);
attendanceRouter.get('/:id', getAttendance);
attendanceRouter.put('/:id', updateAttendance);
attendanceRouter.delete('/:id', deleteAttendance);

export default attendanceRouter;
