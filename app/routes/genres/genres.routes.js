const {
    Router,
} = require('express');

const genresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/', genresController.getAllGenres)
        .get('/:genreName', genresController.getGamesByGenre )
        .get('/:genreName/:page', genresController.getGamesByGenre );

    app.use('/genres', router);
};

module.exports = {
    init,
};
