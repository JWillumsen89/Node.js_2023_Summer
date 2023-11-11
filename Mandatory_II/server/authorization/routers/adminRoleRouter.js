import { Router } from 'express';
const router = Router();

import { requireRole } from '../middlewares/authorizationMiddlewares.js';
import { isAuthenticated } from '../../authentication/middlewares/authMiddlewares.js';
import { authorizationController } from '../controllers/authorizationController.js';

router.get('/admin/data', isAuthenticated, requireRole(['admin']), (req, res) => {
    res.send({ data: 'This is some admin data' });
});

router.get('/admin/users', isAuthenticated, requireRole(['admin']), async (req, res) => {
     const users = await authorizationController.getAllUsersWithUserRole();
    res.send({ data: users });
});

export default router;
