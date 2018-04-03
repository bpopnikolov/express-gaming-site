const {
    Router,
} = require('express');

const GamesController = require('../../controllers/games.controller');
const errorsConfig = require('../../config/errors.config');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new GamesController(dbWrapper);

    const gamesByNameApiMiddleware = async (req, res, next) => {
        const gameNameStr = req.params.gameName;
        const page = (req.params.page || 1) - 1;
        const gamesPerPage = 10;
        const gamesFromDbStartingFrom = page * gamesPerPage;

        const gamesObjs = await controller.getGamesThatIncludesStr(gameNameStr, gamesPerPage, gamesFromDbStartingFrom);

        if (!gamesObjs) {
            return next();
        }

        const context = {};
        context.gameName = gameNameStr;

        const games = [];

        gamesObjs.forEach((gameObj, index) => {
            const curGame = {};
            curGame.name = gameObj.name;
            curGame.summary = gameObj.summary;
            curGame.rating = gameObj.rating;
            curGame.ratingCount = gameObj.ratingCount;
            curGame.releaseDate = gameObj.releaseDate;
            curGame.coverUrl = gameObj.cover;

            // curGame.gameModes = gameObj.GameModes
            //     .map((gameMode) => gameMode.name);

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

            // curGame.websites = gameObj.Websites
            //     .map((website) => website.url);

            games.push(curGame);
        });

        context.gamesObjs = games;
        return res.send(context);
    };

    router
        .get('/:gameName/getUserRating', async (req, res, next) => {
            if (!req.isAuthenticated()) {
                return res.status(401).json(errorsConfig.unauthorizedError);
            }

            const user = req.user;
            const gameName = req.params.gameName;
            const gameObj = await controller.getByName(gameName);

            if (!gameObj) {
                return res.status(404).json(errorsConfig.gameNotFoundError);
            }

            const userRating =
                await controller.getGameUserRating(user, gameObj);

            if (!userRating) {
                return res.status(404).json(errorsConfig.noUserRatingerror);
            }

            return res.status(200).json({
                ratingGiven: userRating.rating,
            });
        })
        .post('/:gameName/setUserRating', async (req, res, next) => {
            if (!req.isAuthenticated()) {
                return res.status(401).json({
                    error: true,
                    msg: errorsConfig.unauthorizedError,
                });
            }

            const rating = req.body.rating;
            const gameName = req.params.gameName;
            const gameObj = await controller.getByName(gameName);
            const user = req.user;

            const savedRating =
                await controller.setGameRating(user, gameObj, rating);

            return res.status(200).json(savedRating);
        })
        .get('/gamesByName/:gameName', gamesByNameApiMiddleware)
        .get('/gamesByName/:gameName/:page', gamesByNameApiMiddleware);

    app.use('/api/games', router);
};

module.exports = {
    init,
};