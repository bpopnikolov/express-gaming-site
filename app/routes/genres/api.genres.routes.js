const {
    Router,
} = require('express');

const genresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/', genresController.apiGetAllGenres)
        .get('/:genreName', genresController.apiGetGamesByGenre)
        .get('/:genreName/:page', genresController.apiGetGamesByGenre);

    app.use('/api/genres/', router);
};

module.exports = {
    init,
};
