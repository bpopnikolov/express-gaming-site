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
        .get('/:gameName', gamesController.getByName);
    // router
    //     .get('/:name', async (req, res) => {
    //         console.log(req.params);
    //         res.render('app/games');
    //     });
    app.use('/games', router);
};

module.exports = {
    init,
};
