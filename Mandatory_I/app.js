import express from 'express';
const app = express();

app.use(express.static('public'));

import path from 'path';

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/homepage/homepage.html'));
});

app.get('/node.js', (req, res) => {
    res.sendFile(path.resolve('./public/node.jspage/node.jspage.html'));
});

app.get('/express.js', (req, res) => {
    res.sendFile(path.resolve('./public/express.jspage/express.jspage.html'));
});

app.get('/javascriptfundamentals', (req, res) => {
    res.sendFile(path.resolve('./public/javascriptfundamentalspage/javascriptfundamentalspage.html'));
});

app.get('/frontend', (req, res) => {
    res.sendFile(path.resolve('./public/frontendpage/frontendpage.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./public/loginpage/loginpage.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve('./public/contactpage/contactpage.html'));
});
const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
