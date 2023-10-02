import express from 'express';
const app = express();
import session from 'express-session';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'f4a82d3d88a549f3be2de0038b8d9db8d6c6f7e650784e72c4812f7daea983ef',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);

import path from 'path';

const users = [
    {
        username: 'test',
        password: 'password123',
    },
    {
        username: 'test2',
        password: 'password456',
    },
];

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

app.get('/adminpage', (req, res) => {
    if (req.session.isAuthenticated) {
        res.sendFile(path.resolve('./public/adminpage/adminpage.html'));
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/adminpage');
        }

        res.clearCookie('connect.sid');
        return res.redirect('/login');
    });
});

app.get('/auth_status', (req, res) => {
    if (req.session.isAuthenticated) {
        res.json({ isAuthenticated: true });
    } else {
        res.json({ isAuthenticated: false });
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (user) {
        if (user.password === password) {
            req.session.isAuthenticated = true;
            res.redirect('/adminpage');
        } else {
            res.status(401).send({ success: false, message: 'Incorrect password.' });
        }
    } else {
        res.status(404).send({ success: false, message: 'User not found.' });
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
