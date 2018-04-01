const {
    Router,
} = require('express');

const gamesController = require('../controllers/games.controller');

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:gameName', gamesController.getByName);

    app.use('/games', router);
};

module.exports = {
    init,
};
