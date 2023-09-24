import express from 'express';
const app = express();

app.use(express.static('public'));

import path from 'path';

app.get('/', (req, res, next) => {
    try {
        const filePath = path.resolve('./public/html/frontpage.html');
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error sending the file:', error);
        next(error); // Pass the error to the error handling middleware
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
