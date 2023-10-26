import { Router } from 'express';
const router = Router();

import { authController } from '../controllers/authController.js';

router.post('/auth/login', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.send({ data: { message: 'Login successful', body: req.body } });
});

router.post('/auth/signup', async (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        await authController.register(req.body);
        res.send({ data: { message: 'Login successful', body: req.body } });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;
