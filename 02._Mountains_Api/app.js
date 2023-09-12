const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

/*const mountains = [
    { id: 1, name: 'Everest', height: 8848, country: 'Nepal;China', firstAscent: 1953, recordTime: '26 hours' },
    { id: 2, name: 'Aconcagua', height: 6961, country: 'Argentina', firstAscent: 1897, recordTime: '8 hours 10 mins' },
    { id: 3, name: 'Denali', height: 6190, country: 'United States', firstAscent: 1913, recordTime: '11 hours 48 mins' },
    { id: 4, name: 'Kilimanjaro', height: 5895, country: 'Tanzania', firstAscent: 1889, recordTime: '6 hours 42 mins' },
    { id: 5, name: 'Mont Blanc', height: 4810, country: 'France;Italy', firstAscent: 1786, recordTime: '4 hours 57 mins' },
];*/
let mountains = require('./mountainsDB.json');
let currentMaxId = Math.max(...mountains.map(mountain => mountain.id));

const schema = Joi.object({
    name: Joi.string().min(3).max(40).required(),
    height: Joi.number().min(3).max(12000).required(),
    country: Joi.string().min(3).max(40).required(),
    firstAscent: Joi.number().min(1),
});

const patchSchema = Joi.object({
    name: Joi.string().min(3).max(40).optional(),
    height: Joi.number().min(3).max(12000).optional(),
    country: Joi.string().min(3).max(40).optional(),
    firstAscent: Joi.number().min(1).optional(),
});

app.get('/mountains', (req, res) => {
    res.send({ data: mountains });
});

app.get('/mountains/random', (req, res) => {
    const index = Math.floor(Math.random() * mountains.length);
    const mountain = mountains[index];
    res.send({ data: mountain });
});

app.get('/mountains/:id', (req, res) => {
    const mountainId = Number(req.params.id);
    if (!mountainId) {
        return res.status(404).send({ error: `ID must be an number!` });
    }

    const mountain = mountains.find(m => m.id === mountainId);

    if (mountain) {
        res.send({ data: mountain });
    } else {
        res.status(404).send({ message: `No mountain with id: ${mountainId} found` });
    }
});

app.get('/mountains/max-height/:height', (req, res) => {
    const mountainHeight = Number(req.params.height);
    if (!mountainHeight) {
        return res.status(404).send({ error: `Input must be a number!` });
    }

    const result = mountains.filter(m => m.height <= mountainHeight);

    if (result.length) {
        res.send({ data: result });
    } else {
        res.status(404).send({ message: 'No mountains found with or below the specified height', mountains: [] });
    }
});

app.get('/mountains/min-height/:height', (req, res) => {
    const mountainHeight = Number(req.params.height);
    if (!mountainHeight) {
        return res.status(404).send({ error: `Input must be a number!` });
    }

    const result = mountains.filter(m => m.height >= mountainHeight);

    if (result.length) {
        res.send({ data: result });
    } else {
        res.status(404).send({ message: 'No mountains found with or above the specified height', mountains: [] });
    }
});

app.get('/mountains/country/:country', (req, res) => {
    const country = req.params.country.toLowerCase();

    if (/^[a-zA-Z\s]+$/.test(country)) {
        const result = mountains.filter(mountain => {
            return mountain.country.toLowerCase().includes(country);
        });
        if (result.length) {
            res.send({ data: result });
        } else {
            res.status(404).send({ message: 'No mountains found for the specified country' });
        }
    } else {
        res.status(200).send({ error: 'Invalid country name' });
    }
});

app.post('/mountains', async (req, res) => {
    const { name, height, country, firstAscent } = req.body;

    try {
        const result = await schema.validateAsync({ name, height, country, firstAscent });

        const mountain = mountains.find(m => m.name === name);

        if (mountain) {
            res.status(409).send({ error: 'Mountain already exists' });
            return;
        }

        const newMountain = {
            id: ++currentMaxId,
            ...result,
        };

        mountains.push(newMountain);

        console.log('New mountain has been created');
        res.status(201).send(newMountain);
    } catch (error) {
        res.status(400).send({ error: error.details[0].message });
    }
});

app.put('/mountains/:id', async (req, res) => {
    const mountainId = Number(req.params.id);

    try {
        if (!mountainId) {
            return res.status(404).send({ error: `ID must be an number!` });
        }

        const { name, height, country, firstAscent } = req.body;

        const result = await schema.validateAsync({ name, height, country, firstAscent });

        const mountain = mountains.find(m => m.id === mountainId);

        if (mountain) {
            const updatedMountain = {
                ...mountain,
                ...result,
            };

            mountains = mountains.map(m => (m.id === mountainId ? updatedMountain : m));

            res.status(200).send(updatedMountain);
        } else {
            res.status(404).send({ message: `No mountain with id: ${mountainId} found` });
        }
    } catch (error) {
        res.status(400).send({ error: error.details[0].message });
    }
});

app.patch('/mountains/:id', async (req, res) => {
    const mountainId = Number(req.params.id);

    try {
        if (!mountainId) {
            return res.status(400).send({ error: `ID must be an number!` });
        }

        const mountain = mountains.find(m => m.id === mountainId);

        if (mountain) {
            const updatedMountain = { ...mountain, ...req.body };
            delete updatedMountain.id;

            const validation = await patchSchema.validateAsync(updatedMountain);

            Object.assign(mountain, updatedMountain);

            res.send({ message: `Mountain with id: ${mountainId} partially updated successfully`, data: mountain });
        } else {
            res.status(404).send({ message: `No mountain with id: ${mountainId} found` });
        }
    } catch (error) {
        res.status(400).send({ error: error.details[0].message });
    }
});

app.delete('/mountains/:id', (req, res) => {
    const mountainId = Number(req.params.id);

    if (!mountainId) {
        return res.status(400).send({ error: `ID must be an number!` });
    }

    const foundIndex = mountains.findIndex(m => m.id === mountainId);

    if (foundIndex) {
        //mountains = mountains.filter(m => m.id !== mountainId);
        mountains.splice(foundIndex, 1);
        res.send({ message: `Mountain with id: ${mountainId} deleted successfully` });
    } else {
        res.status(404).send({ message: `No mountain with id: ${mountainId} found` });
    }
});

const PORT = 8080;

//error is a undefined, when there is'nt an error. If there is an error it's an Stacktrace.

app.listen(PORT, error => {
    if (error) {
        console.log('Error starting the server', error);
        return;
    }
    console.log('Server is running on port', PORT);
});

module.exports = app