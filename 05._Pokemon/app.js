//const express = require('express');

//the argument for using type="module" in package.json and import in js files, is because its more recognizable
import express from 'express';
const app = express();

app.use(express.static('public'));

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

const pikachu = {
    url: 'blabla',
    name: 'Pikachu',
    strength: 8,
};

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

//const PORT = Number(process.env.PORT);
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
