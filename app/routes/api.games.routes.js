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
        .post('/:gameId', gamesController.apiSetGameRating);
    // router
    //     .post('/:gameId', async (req, res) => {
    //         console.log(req.params);
    //         res.render('app/games');
    //     });
    app.use('/games', router);
};

module.exports = {
    init,
};
