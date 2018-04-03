// const dbWrapper = require('../database-wrapper');

class GamesController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    async getByName(gameName) {
        const gameObj = await this.dbWrapper.games.getByName(gameName);

        if (!gameObj) {
            return gameObj;
        }

        const ratingObj = await this.dbWrapper.ratings.getAllGameRatings(gameObj.id);

        const userCount = ratingObj.count;

        const sumOfRatings = ratingObj.rows.reduce((accumulator, currentObj) =>
            accumulator + currentObj.rating, 0);

        const avgRating = (sumOfRatings / userCount).toFixed(1);

        gameObj.avgRating = avgRating;
        gameObj.userCount = userCount;

        return gameObj;
    }

    async getGameUserRating(user, gameObj) {
        const objToCheck = {
            GameId: +gameObj.id,
            UserId: +user.id,
        };
        const ratingGiven =
            await this.dbWrapper.ratings.getGameRatingByUserIdAndGameId(objToCheck);

        return ratingGiven;
    }


    async setGameRating(user, gameObj, rating) {
        const ratingObj = {
            rating: +rating,
            GameId: +gameObj.id,
            UserId: +user.id,
        };

        const savedRating =
            await this.dbWrapper.ratings.getGameRatingByUserIdAndGameId(ratingObj);

        const contextOfUserRatingReq =
            savedRating ?
            await this.dbWrapper.ratings.updateExistingRating(savedRating, ratingObj) :
            await this.dbWrapper.ratings.create(ratingObj);

        const ratingObjOfGame =
            await this.dbWrapper.ratings.getAllGameRatings(gameObj.id);

        const userCount = ratingObjOfGame.count;

        const sumOfRatings =
            ratingObjOfGame.rows.reduce((accumulator, currentObj) =>
                accumulator + currentObj.rating, 0);

        const avgRating = (sumOfRatings / userCount).toFixed(1);
        const contextOfAvgRating = {
            avgRating,
            userCount,
        };
        return {
            contextOfUserRatingReq,
            contextOfAvgRating,
        };
    }

    async getGamesThatIncludesStr(strToInclude, limit, offset) {
        return this.dbWrapper.games.getAllThatIncludes(strToInclude, limit, offset);
    }
}


module.exports = GamesController;
