import express from 'express';
import jwtMiddleware from '../middleware/jwtMiddleware';

const userRouter = express.Router();

userRouter.use(jwtMiddleware);
userRouter.route('/')
    .get((request, response) => {
        response.json({
            authorization: request.authUser,
            message: "[GET] /users",
        })
    })
    .post((request, response) => {
        response.json({
            authorization: request.authUser,
            message: "[POST] /users",
        })
    })
    .put((request, response) => {
        response.json({
            authorization: request.authUser,
            message: "[PUT] /users",
        })
    });

userRouter.get('/:userId', (request, response) => {
    let userId = request.params.userId || null;
    response.json({
        authorization: request.authUser,
        message: `[GET] /users/${userId}`,
    })
});

export default userRouter;
