import express from 'express';
const app = express();

app.use(express.json());

import supermarketsRouter from './routers/supermarketsRouter.js';
app.use(supermarketsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port`, PORT);
});
