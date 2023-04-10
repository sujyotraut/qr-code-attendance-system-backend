import express from 'express';
import { loginStudent, registerStudent } from '../controllers/auth.controllers';

const authRouter = express.Router();

authRouter.post('/login-student', loginStudent);
authRouter.post('/register-student', registerStudent);

export default authRouter;
