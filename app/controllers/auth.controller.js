const passport = require('passport');
const errorsConfig = require('../config/errors.config');
// const dbWrapper = require('../database-wrapper');


class AuthController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    login(req, res, next) {
        console.log(this);
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                // render the login view with error
            }

            if (info) {
                // render login with some error msg
                // user is not authenticated
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
    }

    async register(req, res, next) {
        console.log(this);
        const firstname = req.body.first_name;
        const lastname = req.body.last_name;
        const email = req.body.email;
        const password = req.body.password;
        const user = {
            firstname,
            lastname,
            email,
            password,
        };
        console.log(user);
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


        const savedUser = await this.dbWrapper
            .users.Model.create(user);

        return res.redirect(201, '/');
    }
}


module.exports = AuthController;
