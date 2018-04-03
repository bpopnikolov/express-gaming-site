const genericDbWrapper = require('./generic.db.wrapper');

const {
    UserGameRating,
    Game,
    User,
} = require('../../db/models');

class ratingsDbWrapper extends genericDbWrapper {
    constructor() {
        super(UserGameRating, [Game, User]);
    }

    findOne(user, game) {
        return this.Model.findOne({
            where: {
                UserId: user.id,
                GameId: game.id,
            },
        });
    }

    getGameRatingByUserIdAndGameId(obj) {
        return this.Model.findOne({
            where: {
                UserId: obj.UserId,
                GameId: obj.GameId,
            },
            include: this.includes,
        });
    }

    getAllGameRatings(gameId) {
        return this.Model.findAndCountAll({
            where: {
                GameId: gameId,
            },
            include: this.includes,
        });
    }

    updateExistingRating(savedObj, ratingObj) {
        return savedObj.update({
            rating: ratingObj.rating,
        });
    }

    findOrCreateRating(obj) {
        return this.Model.findCreateFind({
            where: {
                UserId: obj.UserId,
                GameId: obj.GameId,
            },
            defaults: obj,
        });
    }
}

module.exports = ratingsDbWrapper;
