import { Router } from 'express';
const router = Router();

router.post('/auth/login', (req, res) => {
    console.log(JSON.stringify(req.body));
    res.send({ data: { message: 'Login successful', body: req.body } });
});

router.post('/auth/signup', (req, res) => {
    res.send({ data: { message: 'Login successful', body: req.body } });
});

export default router;
