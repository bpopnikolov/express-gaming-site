const {
    Router,
} = require('express');

const AuthController = require('../../controllers/auth.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/register', async (req, res) => {
            if (req.isAuthenticated()) {
                res.redirect('/');
            }

            res.render('auth/register');
        })
        .post('/register', AuthController.register)
        .get('/login', async (req, res) => {
            if (req.isAuthenticated()) {
                res.redirect('/');
            }

            res.render('auth/login');
        })
        .post('/login', AuthController.login)
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
    // .post('/login', (req, res, next) => {
    // });

    app.use('/auth', router);
};

module.exports = {
    init,
};
