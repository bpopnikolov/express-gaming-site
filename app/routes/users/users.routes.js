const {
    Router,
} = require('express');

const UsersController = require('../../controllers/users.controller');
const errorsConfig = require('../../config/errors.config');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new UsersController(dbWrapper);

    router.get('/:username', async (req, res, next) => {
        const username = req.params.username;
        const user = await controller.getUserByUsername(username);

        if (req.isAuthenticated() && user.username === req.user.username) {
            return res.redirect('/users/profile/edit');
        }

        if (user) {
            // render user profile page
        }


        // else go to page not found
        return next();
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
