const {
    Router,
} = require('express');

const GenresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new GenresController(dbWrapper);

    const apiMiddleware = async (req, res, next) => {
        const genreNameStr = req.params.genreName;

        const page = (req.params.page || 1) - 1;
        const gamesPerPage = 10;
        const gamesFromDbStartingFrom = page * gamesPerPage;

        const gamesInRange = await controller.getGamesInRange(genreNameStr, gamesPerPage, gamesFromDbStartingFrom);

        if (!gamesInRange) {
            return next();
        }

        const context = {};
        context.genre = genreNameStr;

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
            const allGenresObjs = await controller.getAllGenres();

            const context = {};
            context.allGenres = allGenresObjs.map((genre) => genre.name);
            res.send(context);
        })
        .get('/:genreName', apiMiddleware)
        .get('/:genreName/:page', apiMiddleware);

    app.use('/api/genres', router);
};

module.exports = {
    init,
};
