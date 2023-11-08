export function requireRole(roles) {
    return function (req, res, next) {
        if (req.session && req.session.user && (req.session.user.role === 'admin' || roles.includes(req.session.user.role))) {
            next();
        } else {
            res.status(403).send('You do not have the right role');
        }
    };
}
