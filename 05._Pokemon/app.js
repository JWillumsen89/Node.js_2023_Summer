//const express = require('express');

//the argument for using type="module" in package.json and import in js files, is because its more recognizable
import express from 'express';
const app = express();

app.use(express.static('public'));
//Cant use __dirname anymore, because its not defined. Use import path from "path" instead
import path from 'path';

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/frontpage.html'));
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
