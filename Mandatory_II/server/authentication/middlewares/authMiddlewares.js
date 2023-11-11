import { rateLimit } from 'express-rate-limit';

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

export function isAuthenticated(req, res, next) {
    console.log('Checking if user is authenticated');
    console.log('Session', req.session);
    console.log('Session user', req.session.user);
    if (req.session && req.session.user) {
        console.log('User is authenticated');
        return next();
    }
    return res.status(401).send('User is not authenticated!');
}
