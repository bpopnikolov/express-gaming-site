const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const {
    Strategy,
} = require('passport-local');

const dbWrapper = require('../database-wrapper');

const init = (app) => {
    passport.use(new Strategy({
        // by default, local strategy uses username and password,
        // we will override with email
        usernameField: 'email',
        passwordField: 'password',
        // allows us to pass back the entire request to the callback
        passReqToCallback: true,
    }, (req, email, password, done) => {
        const user = dbWrapper.users.getByEmail(email);

        // console.log(user);
        if (!user) {
            console.log('invalid user');
            return done(null, false, {
                message: 'Incorrect email.',
            });
        }

        // user exists in db
        if (!(user.comaprePassword(password))) {
            console.log('Invalid password');
            return done(null, false, {
                message: 'Incorrect password.',
            });
        }
        // password is correct as well
        return done(null, user);
    }));
    passport.serializeUser((user, done) => {
        console.log('cookie sent to user');
        return done(null, user.username);
    });

    passport.deserializeUser((email, done) => {
        const user = dbWrapper.users.getByEmail(email);
        if (!user) {
            return done(new Error('Invalid user'));
        }
        console.log('cookie sent to server by user');
        return done(null, user);
    });

    app.use(cookieParser());
    app.use(session({
        secret: 'Beer or two?',
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = {
    init,
};
