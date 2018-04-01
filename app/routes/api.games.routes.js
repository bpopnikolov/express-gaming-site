const {
    Router,
} = require('express');

const gamesController = require('../controllers/games.controller');

// const game = {
//     name: 'test123',
// };

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:gameName/api', gamesController.apiGetByName)
        .post('/:gameName', gamesController.apiSetGameRating);

    app.use('/games', router);
};

module.exports = {
    init,
};
