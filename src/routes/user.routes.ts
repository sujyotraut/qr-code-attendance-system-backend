import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser, validateUser } from '../controllers/user.controllers';
import pagination from '../middleware/pagination.middleware';
import sorting from '../middleware/sorting.middleware';

const userRouter = express.Router();

userRouter.get('/', sorting('User'), pagination(), getUsers);
userRouter.post('/', validateUser, createUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', validateUser, updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
