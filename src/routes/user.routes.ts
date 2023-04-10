import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controllers';

const userRouter = express.Router();

userRouter.get('/', getUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
