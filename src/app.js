import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {
    authRouter,
    userRouter,
} from './routers';

// load .env vars
dotenv.load();

// app version constants
const apiVersion = "1.0.0";

// app instance
const app = express();

// apply universal middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// provide api information
app.get('/', (request, response) => {
    response.json({
        version: apiVersion,
        lastUpdated: new Date("2019-01-01T08:12:01.123Z"),
    })
});
// supply sub-routers to their respective domains
app.use('/auth', authRouter);
app.use('/users', userRouter);

// start listening
app.listen(3000, () => {
    console.log(`App running on port ${3000}`)
});
