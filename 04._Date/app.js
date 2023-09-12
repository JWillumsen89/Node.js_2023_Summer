const express = require('express');
const app = express();

// Locale Time string
console.log(Date());
// UTC Timestamp
console.log(new Date());
//Epoch timestamp / Unix - It's in seconds.
console.log(Date.now());

//Task: create a route that returns the date
app.get('/currentDate', (req, res) => {
    res.send({ data: { currentDate: new Date() } });
});

//Task2: create a route that returns the current month
app.get('/currentMonth', (req, res) => {
    const month = new Date().toLocaleString('en', { month: 'long' });
    res.send({
        data: {
            currentMonth: month,
        },
    });
});

//Task3: create a route that returns the current day
app.get('/currentDay', (req, res) => {
    const day = new Date().toLocaleString('en', { weekday: 'long' });
    res.send({
        data: {
            currentDay: day,
        },
    });
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server running on', PORT);
});
