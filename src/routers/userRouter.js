import express from 'express';
import jwtMiddleware from '../middleware/jwtMiddleware';
import userController from '../controllers/userController';

const userRouter = express.Router();

userRouter.use(jwtMiddleware);
userRouter.get('/', userController.searchUsers)
userRouter.post('/', userController.createUser);
userRouter.get('/:userId', userController.getUser);
userRouter.put('/:userId', userController.updateUser);

export default userRouter;
