import express from 'express';
const app = express();
import session from 'express-session';

import {
    homepagePage,
    nodejspagePage,
    expressjspagePage,
    javascriptfundamentalspagePage,
    javascriptenhancedpagePage,
    loginpagePage,
    adminpagePage,
    gitpagePage,
    restapipagePage,
    miscellaneouspagePage,
    ssrvscsrpagePage,
} from './util/preparePages.js';

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

const users = [
    {
        username: 'test',
        password: 'password123',
    },
];

app.get('/', (req, res) => res.send(homepagePage));

app.get('/node.js', (req, res) => res.send(nodejspagePage));

app.get('/express.js', (req, res) => res.send(expressjspagePage));

app.get('/javascriptfundamentals', (req, res) => res.send(javascriptfundamentalspagePage));

app.get('/javascriptenhanced', (req, res) => res.send(javascriptenhancedpagePage));

app.get('/frontend', (req, res) => res.sendFile(path.resolve('./public/pages/frontendpage/frontendpage.html')));

app.get('/login', (req, res) => res.send(loginpagePage));

app.get('/git', (req, res) => res.send(gitpagePage));

app.get('/restapi', (req, res) => res.send(restapipagePage));

app.get('/ssrvscsr', (req, res) => res.send(ssrvscsrpagePage));

app.get('/miscellaneous', (req, res) => res.send(miscellaneouspagePage));

app.get('/adminpage', (req, res) => {
    if (req.session.isAuthenticated) res.send(adminpagePage);
    else res.redirect('/login');
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
            res.redirect('/login?error=password');
        }
    } else {
        res.redirect('/login?error=username');
    }
});

const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
