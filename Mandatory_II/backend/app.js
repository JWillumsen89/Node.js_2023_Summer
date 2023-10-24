import express from 'express';
const app = express();

import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
app.use(cors());

const allRoutesLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(allRoutesLimiter);

const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use('/auth', authRateLimiter);

import authRouter from './routers/authRouter.js';
app.use(authRouter);

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
