const {
    Router,
} = require('express');

const passport = require('passport');

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
            // to do
            res.redirect('/auth/login');
        })
        .post('/login', (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    console.log(err);
                }
                res.redirect('/auth/register');
                // console.log(info);
            })(req, res, next);
        });

    app.use('/auth', router);
};

module.exports = {
    init,
};
