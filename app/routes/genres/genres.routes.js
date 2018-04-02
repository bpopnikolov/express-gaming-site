const {
    Router,
} = require('express');

const GenresController = require('../../controllers/genres.controller');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new GenresController(dbWrapper);

    const middleware = async (req, res, next) => {
        const genreNameStr = req.params.genreName;
        const games = await controller.getGamesByGenre(genreNameStr);

        if (!games) {
            return next();
        }

        const context = {};
        context.genreName = genreNameStr;
        const gamesPerPage = 10;
        context.pagesCount = Math.ceil(games.length / gamesPerPage);

        return res.render('genres/gamesFromGenre', context);
    };

    router
        .get('/', (req, res, next) => {
            res.render('genres/allGenres');
        })
        .get('/:genreName', middleware)
        .get('/:genreName/:page', middleware);

    app.use('/genres', router);
};

module.exports = {
    init,
};
