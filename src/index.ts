import cors from 'cors';
// import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/error.middleware';
import attendanceRouter from './routes/attendance.routes';
import authRouter from './routes/auth.routes';
import lectureRouter from './routes/lecture.routes';
import studentRouter from './routes/student.routes';
import teacherRouter from './routes/teacher.routes';
import userRouter from './routes/user.routes';
import APIResponse from './types/APIResponse';

// Load environment variable form .env file
// dotenv.config();
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Base route
app.get('/', (_, res: APIResponse) => {
  res.status(200).json({ status: 'success', data: 'Server is up & running...' });
});

// Routes
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);
app.use('/lectures', lectureRouter);
app.use('/attendances', attendanceRouter);

// Not found route
// In Express 5 `(*)` is no longer valid and must be written as `(.*)`
app.all('(.*)', (_, res: APIResponse) => {
  res.status(404).json({ status: 'fail', message: 'Not Found' });
});

// Error handler
app.use(errorHandler);

// HTTP server
app.listen(port, () => console.log(`HTTP server is listening on port ${port}`));

// // HTTPs server option
// const options: https.ServerOptions = {
//   key: fs.readFileSync(`${__dirname}/config/cert.key`, 'utf-8'),
//   cert: fs.readFileSync(`${__dirname}/config/cert.crt`, 'utf-8'),
// };

// // HTTPs server
// https.createServer(options, app).listen(8080, () => {
//   console.log(`HTTPS server is listening on port 8080`);
// });
