import { Router } from 'express';

const router = Router();

router.get('/users', (req, res) => {
    console.log(req.path, ':', req.session);
    if (!req.session.nameOfUser) {
        res.send({ data: 'I dont know you' });
    } else {
        res.send({ data: `Hello ${req.session.nameOfUser}` });
    }
});

router.get('/users/logout', (req, res) => {
    req.session.nameOfUser = undefined;
    delete req.session.nameOfUser;
    req.session.destroy(() => {
        res.send({ data: 'You have been logged out' });
    });
});

router.get('/users/:registerUsersName', (req, res) => {
    console.log(req.path, ':', req.session);
    req.session.nameOfUser = req.params.registerUsersName;
    res.send({ data: `Your name ${req.params.registerUsersName} was stored in this session` });
});

export default router;
