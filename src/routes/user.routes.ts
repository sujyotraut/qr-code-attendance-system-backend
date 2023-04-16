import express from 'express';
import { createUser, deleteUser, getUser, getUsers, updateUser, validateUser } from '../controllers/user.controllers';
import { requireAdmin } from '../middleware/auth.middleware';
import pagination from '../middleware/pagination.middleware';
import sorting, { userSortableFields } from '../middleware/sorting.middleware';

const userRouter = express.Router();

userRouter.use(requireAdmin);

userRouter.get('/', sorting(userSortableFields), pagination(), getUsers);
userRouter.post('/', validateUser, createUser);
userRouter.get('/:id', getUser);
userRouter.put('/:id', validateUser, updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;
