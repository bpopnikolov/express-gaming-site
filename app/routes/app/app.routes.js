const {
    Router,
} = require('express');

const GamesController = require('../../controllers/games.controller');

const init = (app, dbWrapper) => {
    const controller = new GamesController(dbWrapper);
    const router = new Router();
    router
        .get('/', async (req, res) => {
            console.log('User logged in: ', req.isAuthenticated());
            console.log('user: ', req.user);
            const topThreeGames = await controller.getTopThreeGames();
            topThreeGames.forEach((gameObj) => {
                gameObj.genres = gameObj.Genres
                .map((genre) => genre.name);
            });
            const context ={
                topThreeGames,
            };
            res.render('app/home', context);
        });

    app.use('/', router);
};

module.exports = {
    init,
};
