const express = require('express');
const app = express();
const mountains = [
    { id: 1, name: 'Everest', height: 8848, country: 'Nepal;China', firstAscent: 1953, recordTime: '26 hours' },
    { id: 2, name: 'Aconcagua', height: 6961, country: 'Argentina', firstAscent: 1897, recordTime: '8 hours 10 mins' },
    { id: 3, name: 'Denali', height: 6190, country: 'United States', firstAscent: 1913, recordTime: '11 hours 48 mins' },
    { id: 4, name: 'Kilimanjaro', height: 5895, country: 'Tanzania', firstAscent: 1889, recordTime: '6 hours 42 mins' },
    { id: 5, name: 'Mont Blanc', height: 4810, country: 'France;Italy', firstAscent: 1786, recordTime: '4 hours 57 mins' },
];

app.get('/mountains', (req, res) => {
    res.send({ mountains });
});

app.get('/mountains/random', (req, res) => {
    const index = Math.floor(Math.random() * mountains.length);
    const mountain = mountains[index];
    res.send({ mountain });
});

app.get('/mountains/:id', (req, res) => {
    const mountainId = parseInt(req.params.id);
    if (isNaN(mountainId)) {
        return res.status(400).send({ message: `ID must be an integer!` });
    }

    const mountain = mountains.find(m => m.id === mountainId);

    if (mountain) {
        res.send({ mountain });
    } else {
        res.status(200).send({ message: `No mountain with id: ${mountainId} found` });
    }
});

app.get('/mountains/max-height/:height', (req, res) => {
    const mountainHeight = parseFloat(req.params.height);
    if (isNaN(mountainHeight)) {
        return res.status(400).send({ message: `Input must be a number` });
    }

    const result = mountains.filter(m => m.height <= mountainHeight);

    if (result.length > 0) {
        res.send({ mountains: result });
    } else {
        res.status(200).send({ message: 'No mountains found with or below the specified height', mountains: [] });
    }
});

app.get('/mountains/min-height/:height', (req, res) => {
    const mountainHeight = parseFloat(req.params.height);
    if (isNaN(mountainHeight)) {
        return res.status(400).send({ message: `Input must be a number` });
    }

    const result = mountains.filter(m => m.height >= mountainHeight);

    if (result.length > 0) {
        res.send({ mountains: result });
    } else {
        res.status(200).send({ message: 'No mountains found with or below the specified height', mountains: [] });
    }
});

app.get('/mountains/country/:country', (req, res) => {
    const country = req.params.country.toLowerCase();

    if (/^[a-zA-Z\s]+$/.test(country)) {
        const result = mountains.filter(mountain => {
            return mountain.country.toLowerCase().includes(country);
        });
        if (result.length > 0) {
            res.send({ mountains: result });
        } else {
            res.status(404).send({ message: 'No mountains found for the specified country' });
        }
    } else {
        res.status(400).send({ message: 'Invalid country name' });
    }
});

app.listen(8080);
