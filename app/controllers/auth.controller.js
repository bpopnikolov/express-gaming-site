const passport = require('passport');
const errorsConfig = require('../config/errors.config');
const dbWrapper = require('../database-wrapper');

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, authError) => {
        if (err) {
            console.log(err);
            // render the login view with error
        }

        if (authError) {
            // render login with some error msg
            // user is not authenticated
            console.log(authError);
        }

        console.log(user);
        console.log('authenticated');

        // generate cookie
        req.logIn(user, (error) => {
            if (error) {
                // smth went wrong
            }
            // user was logged in. render view with logged in user

            res.redirect('/');
        });
        // console.log(info);
    })(req, res, next);
};

const register = async (req, res, next) => {
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    const formErros = {};

    if (!firstname) {
        formErros.firstnameError = errorsConfig.required;
    }
    if (!lastname) {
        formErros.lastnameError = errorsConfig.required;
    }
    if (!email) {
        errorsConfig.emailError = errorsConfig.required;
    }
    if (!password) {
        errorsConfig.password = errorsConfig.required;
    }

    // check if there is any error
    if (Object.keys(formErros).length > 0) {
        return res.status(400).render('auth/register', formErros);
    }

    const user = {
        firstname,
        lastname,
        email,
        password,
    };

    const savedUser = await dbWrapper
        .users.create(user);

    return res.status(201).redirect('/auth/login').end();
};

module.exports = {
    login,
    register,
};
