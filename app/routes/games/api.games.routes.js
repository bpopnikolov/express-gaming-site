const {
    Router,
} = require('express');

const GamesController = require('../../controllers/games.controller');
const errorsConfig = require('../../config/errors.config');


const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new GamesController(dbWrapper);

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

            const userRating = await controller.getGameUserRating(user, gameObj);

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

            const savedRating = await controller.setGameRating(user, gameObj, rating);

            return res.status(200).json(savedRating);
        });

    app.use('/api/games', router);
};

module.exports = {
    init,
};
