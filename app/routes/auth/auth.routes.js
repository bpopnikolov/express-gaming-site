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
        });

    app.use('/auth', router);
};

module.exports = {
    init,
};

