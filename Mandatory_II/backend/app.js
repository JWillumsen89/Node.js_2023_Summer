import express, { urlencoded } from 'express';
const app = express();

import cors from 'cors';
import { config } from 'dotenv';
config();
import session from 'express-session';
import { rateLimit } from 'express-rate-limit';

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'http://localhost:5173', // Your frontend's origin
        credentials: true, // To handle cookies and authentication
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

const allRoutesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

import { authRateLimiter, isAuthenticated } from './authentication/middlewares/authMiddlewares.js';
app.use('/auth', authRateLimiter);

import authRouter from './authentication/routers/authRouter.js';
app.use(authRouter);

app.get('/protected', isAuthenticated, (req, res, next) => {
    res.send({ data: 'This is protected data - And the user is authenticated' });
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.send({ data: req.session.user });
});

import { requireRole } from './authorization/middlewares/authorizationMiddlewares.js';
app.get('/admin/dashboard', isAuthenticated, requireRole('admin'), (req, res) => {
    res.send({ data: 'This is the admin dashboard' });
});

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
