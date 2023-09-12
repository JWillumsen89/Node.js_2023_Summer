const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/secondPage', (req, res) => {
    res.sendFile(__dirname + '/public/secondPage.html');
});

app.get('/welcomemessage', (req, res) => {
    const clientName = req.query.user;
    if (!clientName) {
        res.send({ data: `Hello there, stranger.` });
    } else {
        res.send({ data: `Hello there, ${req.query.user}.` });
    }
});

const PORT = 8080;

app.listen(PORT, error => {
    if (error) {
        console.log('Error starting the server', error);
        return;
    }
    console.log('Server is running on port', PORT);
});
