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
        .post('/register', async (req, res) => {
            // to do
            res.redirect('/auth/login');
        })
        .get('/login', async (req, res) => {
            res.render('auth/login');
        })
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/',
                failureRedirect: '/login',
                failureFlash: false,
            }))
        .get('/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        });
        // .post('/login', (req, res, next) => {
        //     passport.authenticate('local', (err, user, info) => {
        //         if (err) {
        //             console.log(err);
        //         }
        //         console.log(user);
        //         console.log('authenticated');
        //         req.logIn(user, (error) => {
        //             console.log('Test123');
        //             res.redirect('/');
        //         });
        //         // console.log(info);
        //     })(req, res, next);
        // });

    app.use('/auth', router);
};

module.exports = {
    init,
};