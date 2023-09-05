//import Express
const express = require('express');
//Install Express
const app = express();

//Same as above. But use the above instead in the future.
//const app = require('express')();

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ data: 'This is the first request handler' });
});

// task: create a dog endpoint that returns woof

app.get('/dog', (req, res) => {
    console.log(req.params);
    res.send({ bark: 'Woof' });
});

app.get('/dog/:firstValue/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.params);
    res.send({ dog: 'Meow' });
});

app.get('/cat', (req, res) => {
    console.log(req.query);
    res.send({ date: req.query });
});

let balance = 100;

app.get('/wallet/:withdrawalAmount', (req, res) => {
    const withdrawalAmount = req.params.withdrawalAmount;
    balance -= withdrawalAmount;
    if (balance < 0) {
        res.send({ message: 'You cant withdraw, No money left.' });
    }
    if (req.params.withdrawalAmount > balance) {
        res.send({
            message: `You cant withdraw ${req.params.withdrawalAmount} dkr - Your current balance is: ${balance} dkr`,
        });
    } else {
        res.send({
            message: `You've withdrawn ${req.params.withdrawalAmount} dkr - Your current balance is ${balance - req.params.withdrawalAmount} dkr`,
        });
    }
});

//If you get undefined as return body, then you are missing the app.use(express.json()) in the top.
app.post('/giveMeTheBody', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

//80 http
//443 https
//8080 http developer port
//9090 https developer port

app.listen(8080);
