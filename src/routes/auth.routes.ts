import express from 'express';
import {
  loginAdmin,
  loginStudent,
  loginTeacher,
  registerStudent,
  validateLoginCredentials,
  validateStudentRegisterCredentials,
} from '../controllers/auth.controllers';

const authRouter = express.Router();

authRouter.post('/login-admin', validateLoginCredentials, loginAdmin);
authRouter.post('/login-student', validateLoginCredentials, loginStudent);
authRouter.post('/login-teacher', validateLoginCredentials, loginTeacher);
authRouter.post('/register-student', validateStudentRegisterCredentials, registerStudent);

export default authRouter;
