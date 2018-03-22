const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('passport');
const {
    Strategy,
} = require('passport-local');

const users = [{
    email: 'gogo@gogo.com',
    password: 'gogo123',
}];
const init = (app) => {
    passport.use(new Strategy((email, password, done) => {
        const user = users.find((dbUser) => dbUser.email === email);
        console.log(user);
        if (!user) {
            console.log('invalid user');
            return done(null, false, {
                message: 'Incorrect email.',
            });
        }

        // user exists in db
        if (!(user.password === password)) {
            console.log('Invalid password');
            return done(null, false, {
                message: 'Incorrect password.',
            });
        }
        // password is correct as well
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        console.log('serialize');
        done(null, user, user.username);
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
