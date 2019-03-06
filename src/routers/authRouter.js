import express from 'express';
import configService from '../services/configService';
import authController from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/', authController.loginHandler);
authRouter.get('/', authController.tokenLoginHandler);

export default authRouter;
