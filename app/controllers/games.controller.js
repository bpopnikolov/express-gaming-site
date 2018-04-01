const dbWrapper = require('../database-wrapper');

const getByName = async (req, res, next) => {
    const gameName = req.params.gameName;
    console.log(gameName);
    const gameObj = await dbWrapper.games.getByName(gameName);

    const ratingObj = await dbWrapper.ratings.getAllGameRatings(gameObj.id);

    const userCount = ratingObj.count;

    const sumOfRatings = ratingObj.rows.reduce((accumulator, currentObj) =>
        accumulator + currentObj.rating, 0);

    const avgRating = (sumOfRatings / userCount).toFixed(1);

    if (!gameObj) {
        res.render('app/pageNotFound');
    }

    const context = {
        gameObj,
        avgRating,
        userCount,
    };

    res.render('app/games', context);
};

const apiGetByName = async (req, res, next) => {
    const gameName = req.params.gameName;
    const gameObj = await dbWrapper.games.getByName(gameName);
    if (!gameObj) {
        res.render('app/pageNotFound');
    }
    const gameId = gameObj.id;

    const context = {};

    if (req.user) {
        const userId = req.user.id;
        const objToCheck = {
            GameId: +gameId,
            UserId: +userId,
        };
        const ratingGiven =
            await dbWrapper.ratings.getGameRatingByUserIdAndGameId(objToCheck);

        if (ratingGiven) {
            context.ratingGiven = ratingGiven.rating;
        }
        res.send(context);
    }
};

const apiSetGameRating = async (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            error: true,
            msg: 'You must be logged in in order to vote.',
        });
    }
    const rating = req.body.rating;
    const gameName = req.params.gameName;
    const gameObj = await dbWrapper.games.getByName(gameName);
    const GameId = gameObj.id;
    const UserId = req.user.id;
    const ratingObj = {
        rating: +rating,
        GameId: +GameId,
        UserId: +UserId,
    };

    const savedRating =
        await dbWrapper.ratings.getGameRatingByUserIdAndGameId(ratingObj);
    const contextOfUserRatingReq =
        savedRating ?
        await dbWrapper.ratings.updateExistingRating(savedRating, ratingObj) :
        await dbWrapper.ratings.create(ratingObj);

    const ratingObjOfGame =
        await dbWrapper.ratings.getAllGameRatings(gameObj.id);

    const userCount = ratingObjOfGame.count;

    const sumOfRatings =
        ratingObjOfGame.rows.reduce((accumulator, currentObj) =>
            accumulator + currentObj.rating, 0);

    const avgRating = (sumOfRatings / userCount).toFixed(1);
    const contextOfAvgRating = {
        avgRating,
        userCount,
    };
    const context = {
        contextOfUserRatingReq,
        contextOfAvgRating,
    };
    res.send(context);
};

module.exports = {
    getByName,
    apiSetGameRating,
    apiGetByName,
};
