import express from 'express';
import {
  getStudent,
  getUser,
  loginAdmin,
  loginStudent,
  loginTeacher,
  registerStudent,
  resetDevice,
  validateLoginCredentials,
  validateStudentLoginCredentials,
  validateStudentRegisterCredentials,
} from '../controllers/auth.controllers';
import { requireAdminOrTeacher, requireAuth, requireStudent } from '../middleware/auth.middleware';

const authRouter = express.Router();

authRouter.get('/user', requireAuth, getUser);
authRouter.get('/student', requireStudent, getStudent);
authRouter.get('/student/reset-device', requireAdminOrTeacher, resetDevice);
authRouter.post('/login-admin', validateLoginCredentials, loginAdmin);
authRouter.post('/login-teacher', validateLoginCredentials, loginTeacher);
authRouter.post('/login-student', validateStudentLoginCredentials, loginStudent);
authRouter.post('/register-student', validateStudentRegisterCredentials, registerStudent);

export default authRouter;
