import express from 'express';
const app = express();

import { rateLimit } from 'express-rate-limit';

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

function ipLogger(req, res, next) {
    console.log('Ip Logger: ', new Date(), req.ip);
    next();
}

app.use('/room', ipLogger);

function doorman(req, res, next) {
    if (req.params.secretPhrase === 'SesameOpen') {
        next();
    } else {
        res.status(401).send({ data: 'You are not allowed in' });
    }
}

app.get('/secretRoom/:secretPhrase', doorman, (req, res, next) => {
    res.send({ data: 'You are now in the secret room' });
});

import roomsRouter from './routers/roomsRouter.js';
app.use(roomsRouter);

import furnituresRouter from './routers/furnituresRouter.js';
app.use(furnituresRouter);

app.get('*', (req, res) => {
    res.send('<h1>404 Page not found</h1>');
});

app.all('*', (req, res) => {
    res.status(404).send({ data: `Unsupported path ${req.path}` });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});
