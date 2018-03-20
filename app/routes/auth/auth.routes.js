const {
    Router,
} = require('express');

const init = (app, data) => {
    const router = new Router();
    router
        .get('/register', async (req, res) => {
            res.render('auth/register');
        })
        .get('/login', async (req, res) => {
            res.render('auth/login');
        })
        .post('/register', async (req, res) => {
            // TODO
            res.redirect('/auth/login');
        })
        .post('/login', async (req, res) => {
            // TODO
            res.redirect('/auth/register');
        });

    app.use('/auth', router);
};

module.exports = {
    init,
};

