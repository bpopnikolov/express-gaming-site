const {
    Router,
} = require('express');

const GamesController = require('../controllers/games.controller');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new GamesController(dbWrapper);

    router
        .get('/:gameName', async (req, res, next) => {
            const gameName = req.params.gameName;

            const gameObj = await controller.getByName(gameName);

            if (!gameObj) {
                return next();
            }
            const context = {
                gameObj,
                avgRating: gameObj.avgRating,
                userCount: gameObj.userCount,
            };

            return res.render('app/games', context);
        });

    app.use('/games', router);
};

module.exports = {
    init,
};
