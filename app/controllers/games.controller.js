const dbWrapper = require('../database-wrapper');

const getByName = async (req, res, next) => {
    const gameName = req.params.gameName;
    const gameObj = await dbWrapper.games.getByName(gameName);

    if (!gameObj) {
        res.render('app/pageNotFound');
    }

    const context = {
        gameObj,
    };

    res.render('app/games', context);
};

const apiSetGameRating = async (req, res, next) => {
    // console.log(req.body);
    if (!req.isAuthenticated) {
        res.status(401).json({
            error: true,
            msg: 'You must be logged in in order to vote.',
        });
    }
    const rating = req.body.rating;
    const GameId = req.body.GameId;
    const UserId = req.user.id;
    const ratingObj = {
        rating: +rating,
        GameId: +GameId,
        UserId: +UserId,
    };

    const savedRating =
        await dbWrapper.ratings.getGameRatingByUserIdAndGameId(ratingObj);
    const context =
        savedRating ?
        await dbWrapper.ratings.updateExistingRating(savedRating, ratingObj) :
        await dbWrapper.ratings.create(ratingObj);
    res.send(context);
};

const calculateAverageRating = async (req, res, next) => {

}

module.exports = {
    getByName,
    apiSetGameRating,
};
