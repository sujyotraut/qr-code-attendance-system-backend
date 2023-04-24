import express from 'express';
import {
  getStudent,
  getUser,
  loginAdmin,
  loginStudent,
  loginTeacher,
  registerStudent,
  validateLoginCredentials,
  validateStudentRegisterCredentials,
} from '../controllers/auth.controllers';
import { requireAuth, requireStudent } from '../middleware/auth.middleware';

const authRouter = express.Router();

authRouter.get('/user', requireAuth, getUser);
authRouter.get('/student', requireStudent, getStudent);
authRouter.post('/login-admin', validateLoginCredentials, loginAdmin);
authRouter.post('/login-student', validateLoginCredentials, loginStudent);
authRouter.post('/login-teacher', validateLoginCredentials, loginTeacher);
authRouter.post('/register-student', validateStudentRegisterCredentials, registerStudent);

export default authRouter;
