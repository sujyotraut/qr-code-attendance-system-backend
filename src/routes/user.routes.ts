import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controllers';
import pagination from '../middleware/pagination.middleware';
import sorting, { userSortableFields } from '../middleware/sorting.middleware';

const userRouter = express.Router();

userRouter.get('/', sorting(userSortableFields), pagination(), getUsers);
userRouter.post('/', createUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
