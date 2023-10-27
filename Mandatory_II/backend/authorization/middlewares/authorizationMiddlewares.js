export function requireRole(role) {
    return function (req, res, next) {
        if (req.session && req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.status(403).send('You do not have the right role');
        }
    };
}
