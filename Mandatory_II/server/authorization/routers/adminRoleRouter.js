import { Router } from 'express';
const router = Router();

import { requireRole } from '../middlewares/authorizationMiddlewares.js';
import { isAuthenticated } from '../../authentication/middlewares/authMiddlewares.js';

router.get('/admin/data', isAuthenticated, requireRole(['admin']), (req, res) => {
    res.send({ data: 'This is some admin data' });
});

export default router;
