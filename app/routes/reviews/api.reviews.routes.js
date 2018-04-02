const {
    Router,
} = require('express');

const ReviewsController = require('../../controllers/reviews.controller');
const errorsConfig = require('../../config/errors.config');
const validator = require('../../utils/validator');

const init = (app, dbWrapper) => {
    const router = new Router();
    const controller = new ReviewsController(dbWrapper);

    router.get('/getUserReviews', (req, res, next) => {


    });
    router.post('/addUserReview', async (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({
                error: true,
                msg: errorsConfig.notLoggedInError,
            });
        }

        const user = req.user;
        const gameName = req.body.gameName;
        const review = req.body.review;

        if (!gameName) {
            return res.status(404).json({
                error: true,
                msg: errorsConfig.gameNotFoundError,
            });
        }

        if (!review) {
            return res.status(400).json({
                error: true,
                msg: errorsConfig.noUserReviewError,
            });
        }

        const savedReview = await controller.addUserReview(
            user, gameName, review);

        if (!savedReview) {
            return res.status(400).json({
                error: true,
                msg: errorsConfig.alreadyAddedReviewError,
            });
        }

        return res.status(201).json(savedReview);
    });

    app.use('/api/reviews/', router);
};

module.exports = {
    init,
};
