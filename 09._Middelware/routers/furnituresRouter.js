import { Router } from 'express';
const router = Router();

router.get('/furnitures/chair', (req, res, next) => {
    res.send({ data: 'Monobloc' });
});

router.get('/furnitures/lamp', (req, res, next) => {
    res.send({ data: 'I like lamp' });
});

export default router;
