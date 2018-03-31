const {
    Router,
} = require('express');

const UsersController = require('../../controllers/users.controller');
const errorsConfig = require('../../config/errors.config');

const init = (app, dbWrapper) => {
    const router = new Router();

    router.post('/profile/edit', UsersController.apiEditUserProfile);

    app.use('/api/users', router);
};

module.exports = {
    init,
};
