const {
    Router,
} = require('express');

const GamesController = require('../../controllers/games.controller');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new GamesController(dbWrapper);

    const gamesByNameMiddleware = async (req, res, next) => {
        const gameName = req.params.gameName;
        const gamesObjs = await controller.getGamesThatIncludesStr(gameName);
        const context = {
            gameName,
        };
        const gamesPerPage = 10;
        context.pagesCount = Math.ceil(gamesObjs.length / gamesPerPage);

        return res.render('games/gamesByName', context);
    };

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

            return res.render('games/single-game', context);
        })
        .get('/gamesByName/:gameName', gamesByNameMiddleware)
        .get('/gamesByName/:gameName/:page', gamesByNameMiddleware);

    app.use('/games', router);
};

module.exports = {
    init,
};