const {
    Router,
} = require('express');

const genresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:genreName', genresController.getGamesByCategory );

    app.use('/genres', router);
};

module.exports = {
    init,
};