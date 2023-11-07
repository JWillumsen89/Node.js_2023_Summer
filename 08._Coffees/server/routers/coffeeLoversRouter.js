import { Router } from 'express';
const router = Router();

router.get('/api/coffeeLovers', (req, res) => {
    res.send({ data: req.session.coffeeLover });
});

router.post('/api/coffeeLovers', (req, res) => {
    console.log(req.body);
    req.session.coffeeLover = req.body.coffeeLover;
    res.send({ data: req.session.coffeeLover });
});

export default router;
