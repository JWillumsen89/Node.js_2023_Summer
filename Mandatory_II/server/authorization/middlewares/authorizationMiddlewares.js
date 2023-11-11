export function requireRole(roles) {
    return function (req, res, next) {
        console.log("Roles array:", req.session.user.role)
        if (req.session && req.session.user && (req.session.user.role.includes('admin') || roles.includes(req.session.user.role))) {
            next();
        } else {
            res.status(403).send('You do not have the right role');
        }
    };
}
