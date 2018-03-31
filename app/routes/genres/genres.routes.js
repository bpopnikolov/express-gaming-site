const {
    Router,
} = require('express');

const genresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:genreName', genresController.getGamesByCategory )
        .get('/:genreName/:page', genresController.getGamesByCategory )
        .get('/:genreName/:page/:gamesPerPage', genresController.getGamesByCategory );

    app.use('/genres', router);
};

module.exports = {
    init,
};
