import express from 'express';
const app = express();

import path from 'path';

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/html/frontpage.html'));
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
