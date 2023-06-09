import express from 'express';
import {
  createLecture,
  deleteLecture,
  getLecture,
  getLectureAttendances,
  getLectures,
  updateLecture,
  validateLecture,
} from '../controllers/lecture.controllers';
import { requireTeacher } from '../middleware/auth.middleware';
import pagination from '../middleware/pagination.middleware';
import sorting from '../middleware/sorting.middleware';

const lectureRouter = express.Router();

lectureRouter.get('/', requireTeacher, sorting('Lecture'), pagination(), getLectures);
lectureRouter.get('/:id/attendances', sorting('Attendance'), pagination(), getLectureAttendances);
lectureRouter.post('/', requireTeacher, validateLecture, createLecture);
lectureRouter.get('/:id', getLecture);
lectureRouter.put('/:id', requireTeacher, validateLecture, updateLecture);
lectureRouter.delete('/:id', deleteLecture);

export default lectureRouter;
