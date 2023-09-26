const express = require('express');
const app = express();

//This servers static.
app.use(express.static('public'));

const { getWelcomeMessage } = require('./util/welcomeMessageUtil.js');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.get('/secondPage', (req, res) => {
    res.sendFile(__dirname + '/public/secondPage.html');
});

app.get('/welcomeMessage', (req, res) => {
    const clientName = req.query.user;
    const welcomeMessage = getWelcomeMessage(clientName);
    res.send({ data: welcomeMessage });
});

app.get('/doorman/:key', (req, res) => {
    if (req.params.key === 'sesameopenup') {
        return res.redirect('/welcomeMessage');
    }
    res.send({ data: 'You have not provided the correct key' });
});

const PORT = 8080;

app.listen(PORT, error => {
    if (error) {
        return console.log('Error starting the server', error);
    }
    console.log('Server is running on port', PORT);
});
