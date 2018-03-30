const {
    Router,
} = require('express');

const UsersController = require('../../controllers/users.controller');

const init = (app, dbWrapper) => {
    const router = new Router();


    router.get('/:id/profile');

    router.get('/:id/profile/edit', (req, res, next) => {
        res.render('users/edit');
    });

    app.use('/users', router);
};

module.exports = {
    init,
};
