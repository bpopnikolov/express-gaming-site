const {
    Router,
} = require('express');

const PlatformsController = require('../../controllers/platforms.controller');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new PlatformsController(dbWrapper);

    const apiMiddleware = async (req, res, next) => {
        const platformNameStr = req.params.platformName;

        const page = (req.params.page || 1) - 1;
        const gamesPerPage = 10;
        const gamesFromDbStartingFrom = page * gamesPerPage;

        const gamesInRange = await controller.getGamesInRange(platformNameStr, gamesPerPage, gamesFromDbStartingFrom);

        if (!gamesInRange) {
            return next();
        }

        const context = {};
        context.platfrom = platformNameStr;

        const games = [];

        gamesInRange.forEach((gameObj, index) => {
            const curGame = {};
            curGame.name = gameObj.name;
            curGame.summary = gameObj.summary;
            curGame.rating = gameObj.rating;
            curGame.ratingCount = gameObj.ratingCount;
            curGame.releaseDate = gameObj.releaseDate;
            curGame.coverUrl = gameObj.cover;

            curGame.gameModes = gameObj.GameModes
                .map((gameMode) => gameMode.name);

            curGame.genres = gameObj.Genres
                .map((genre) => genre.name);

            curGame.platfroms = gameObj.Platforms
                .map((platform) => platform.name);

            curGame.publishers = gameObj.Publishers
                .map((publisher) => publisher.name);

            curGame.screenshots = gameObj.Screenshots
                .map((screeshot) => screeshot.url);

            curGame.videos = gameObj.Videos
                .map((video) => video.url);

            curGame.websites = gameObj.Websites
                .map((website) => website.url);

            games.push(curGame);
        });

        context.gamesObjs = games;
        return res.send(context);
    };

    router
        .get('/', async (req, res, next) => {
            const allPlatformsObjs = await controller.getAllPlatforms();

            const context = {};
            context.allPlatforms = allPlatformsObjs.map((platform) => platform.name);
            res.send(context);
        })
        .get('/:platformName', apiMiddleware)
        .get('/:platformName/:page', apiMiddleware);

    app.use('/api/platforms/', router);
};

module.exports = {
    init,
};
