const {
    Router,
} = require('express');

const PlatformsController = require('../../controllers/platforms.controller');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new PlatformsController(dbWrapper);

    const middleware = async (req, res, next) => {
        const platfromNameStr = req.params.platformName;
        const games = await controller.getGamesByPlatform(platfromNameStr);

        if (!games) {
            return next();
        }

        const context = {};
        context.platformName = platfromNameStr;
        const gamesPerPage = 10;
        context.pagesCount = Math.ceil(games.length / gamesPerPage);

        return res.render('platforms/gamesFromPlatform', context);
    };

    router
        .get('/', (req, res, next) => {
            res.render('platforms/allPlatforms');
        })
        .get('/:platformName', middleware)
        .get('/:platformName/:page', middleware);

    app.use('/platforms', router);
};

module.exports = {
    init,
};
