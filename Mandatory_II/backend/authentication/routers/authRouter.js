import { Router } from 'express';
const router = Router();

import { authController } from '../controllers/authController.js';

router.post('/auth/login', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        await authController.login(req, req.body);

        console.log('Session user', req.session.user);
        res.send({ data: { message: 'Login successful', body: req.body } });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/auth/signup', async (req, res, next) => {
    try {
        console.log(JSON.stringify(req.body));
        const createdData = await authController.signUp(req.body);
        res.send({ data: { message: 'Login successful', body: createdData } });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/auth/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error while logging out');
        }
        res.send({ message: 'Logged out successfully' });
    });
});

export default router;
