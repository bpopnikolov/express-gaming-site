const {
    Router,
} = require('express');

const genresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:genreName', genresController.apiGetGamesByCategory);

    app.use('/api/genres', router);
};

module.exports = {
    init,
};
