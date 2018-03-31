const {
    Router,
} = require('express');

const UsersController = require('../../controllers/users.controller');
const errorsConfig = require('../../config/errors.config');

const init = (app, dbWrapper) => {
    const router = new Router();

    router.get('/:username', (req, res, next) => {
        UsersController.getUserProfile(req, res, next);
        res.render('users/edit');
    });

    router.get('/profile/edit', (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.locals.error = errorsConfig.notLoggedInError;
            return next();
        }
        return res.render('users/edit');
    });

    app.use('/users', router);
};

module.exports = {
    init,
};
