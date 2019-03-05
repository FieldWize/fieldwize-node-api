import express from 'express';

const authRouter = express.Router();

authRouter.route('/')
    .get((request, response) => {
        response.json({message: "[GET] /auth"});
    })
    .post((request, response) => {
        response.json({message: "[POST] /auth"});
    });

export default authRouter;
