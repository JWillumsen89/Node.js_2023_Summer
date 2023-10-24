//const express = require('express');

//the argument for using type="module" in package.json and import in js files, is because its more recognizable
import express, { urlencoded } from 'express';
const app = express();
import nodemailer from 'nodemailer';

app.use(express.static('public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

import { randomIntFromInterval } from './util/randomUtil.js';

// ==================================== Read Pages ====================================

import { frontpagePage, battlePage, contactPage } from './util/preparePages.js';

// ==================================== HTML ====================================
app.get('/', (req, res) => {
    // res.sendFile(path.resolve('./public/frontpage/frontpage.html'));
    res.send(frontpagePage);
});

app.get('/battle', (req, res) => {
    res.send(battlePage);
});

app.get('/contact', (req, res) => {
    res.send(contactPage);
});

// ==================================== ROUTES ====================================

let currentPokemon;

app.get('/battlepokemon', (req, res) => {
    if (!currentPokemon || currentPokemon.strength <= 1) {
        const randomPokemonId = randomIntFromInterval(1, 151);
        const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/';
        fetch(pokemonUrl + randomPokemonId)
            //Get a response - it's a ReadableBytestream - Should be converted to json. Then you get the promise.
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(result => {
                //pokemonName = result.name.charAt(0).toUpperCase() + result.name.slice(1);
                const pokemonName = result.name.replace(/\w/, c => c.toUpperCase());
                const imgUrl = result.sprites.other['official-artwork']['front_default'];
                const strength = randomIntFromInterval(1, 10);
                currentPokemon = { name: pokemonName, imgUrl: imgUrl, strength };
                res.send({ data: currentPokemon });
            });
    } else {
        currentPokemon.strength--;
        res.send({ data: currentPokemon });
    }
});

app.post('/contact', (req, res) => {
    console.log('Ok thanks for the message', req.body);
    res.redirect('/');
});

app.post('/sendTestEmail', async (req, res) => {
    /*
Name	Amely Corkery
Username	amely11@ethereal.email
Password	rHCKHbb5KpnWvJvEmW
*/
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'amely11@ethereal.email',
            pass: 'rHCKHbb5KpnWvJvEmW',
        },
    });

    try {
        let info = await transporter.sendMail({
            from: '"Website Contact" <no-reply@yourwebsite.com>',
            to: 'Test@test.com',
            subject: `Test Email`,
            text: 'This is a test email',
            html: `<h1>THIS WORKS!!</h1><br><b>This is a test email</b>`,
        });

        res.status(200).json({ success: true, message: 'Email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error sending email' });
    }
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
