import express from 'express';
import configService from '../services/configService';

const authRouter = express.Router();

authRouter.route('/')
    .get((request, response) => {
        response.json({
            message: "[GET] /auth",
        });
    })
    .post((request, response) => {
        response.json({
            secret: configService.SECRET,
            dbUrl: configService.DB_URL,
            body: request.body,
            message: "[POST] /auth",
        });
    });

export default authRouter;
