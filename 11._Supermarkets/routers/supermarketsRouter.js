import { Router } from 'express';
const router = Router();

import db from '../databases/connection.js';

router.get('/api/supermarkets', async (req, res) => {
    const supermarkets = await db.all('SELECT name, location, is_best_in_denmark FROM supermarkets;');
    console.log(supermarkets);
    res.send({ data: supermarkets });
});

router.post('/api/supermarkets', async (req, res) => {
    const { name, location } = req.body;
    const result = await db.run(`INSERT INTO supermarkets (name, location) VALUES (?, ?);`, [name, location]);
    res.send({ newId: result.lastID });
});

export default router;
