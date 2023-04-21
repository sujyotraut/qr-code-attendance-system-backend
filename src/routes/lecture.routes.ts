import express from 'express';
import {
  createLecture,
  deleteLecture,
  getLecture,
  getLectures,
  updateLecture,
  validateLecture,
} from '../controllers/lecture.controllers';
import { requireTeacher } from '../middleware/auth.middleware';
import pagination from '../middleware/pagination.middleware';
import sorting from '../middleware/sorting.middleware';

const lectureRouter = express.Router();

lectureRouter.get('/', sorting('Lecture'), pagination(), getLectures);
lectureRouter.post(
  '/',
  requireTeacher,
  validateLecture,
  (req, res, next) => {
    console.log('Mid');
    next();
  },
  createLecture
);
lectureRouter.get('/:id', getLecture);
lectureRouter.put('/:id', requireTeacher, validateLecture, updateLecture);
lectureRouter.delete('/:id', deleteLecture);

export default lectureRouter;
