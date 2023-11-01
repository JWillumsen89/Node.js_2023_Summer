import express, { urlencoded } from 'express';
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

import { config } from 'dotenv';
config();

import cors from 'cors';
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

import session from 'express-session';
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

import { rateLimit } from 'express-rate-limit';
const allRoutesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 200 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

import { isAuthenticated } from './authentication/middlewares/authMiddlewares.js';

import authRouter from './authentication/routers/authRouter.js';
app.use(authRouter);

app.get('/protected', isAuthenticated, (req, res, next) => {
    res.send({ data: 'This is protected data - And the user is authenticated' });
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.send({ data: req.session.user });
});

import adminRoleRouter from './authorization/roles/admin/routers/adminRoleRouter.js';
app.use(adminRoleRouter);

/*
import { requireRole } from './authorization/middlewares/authorizationMiddlewares.js';
app.get('/admin/dashboard', isAuthenticated, requireRole('admin'), (req, res) => {
    res.send({ data: 'This is the admin dashboard' });
});*/

app.get('/message', (req, res) => {
    res.json({ message: 'Hello World!', name: 'Mandatory II' });
});

app.get('*', (req, res) => {
    res.send('<h1>404 Page not found</h1>');
});

app.all('*', (req, res) => {
    res.status(404).send({ data: `Unsupported path ${req.path}` });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});
