import { Router } from 'express';
const router = Router();

import { requireRole } from '../middlewares/authorizationMiddlewares.js';
import { isAuthenticated } from '../../authentication/middlewares/authMiddlewares.js';

router.get('/profile', isAuthenticated, requireRole(['user']), (req, res) => {
    res.send({ data: req.session.user });
});

export default router;
