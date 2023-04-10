import express from 'express';
import {
  createLecture,
  deleteLecture,
  getLecture,
  getLectures,
  updateLecture,
} from '../controllers/lecture.controllers';

const lectureRouter = express.Router();

lectureRouter.get('/', getLectures);
lectureRouter.post('/', createLecture);
lectureRouter.get('/:id', getLecture);
lectureRouter.put('/:id', updateLecture);
lectureRouter.delete('/:id', deleteLecture);

export default lectureRouter;
