/*
import dotenv from 'dotenv';
dotenv.config();*/
import 'dotenv/config';


import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors);

import helmet from 'helmet';
app.use(helmet());

import session from 'express-session';

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

import usersRouter from './routers/usersRouter.js';
app.use(usersRouter);
import coffeesRouter from './routers/coffeesRouter.js';
app.use(coffeesRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port`, PORT);
});
