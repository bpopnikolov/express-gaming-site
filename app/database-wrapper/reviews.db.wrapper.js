const genericDbWrapper = require('./generic.db.wrapper');

const {
    UserGameReview,
    Game,
    User,
} = require('../../db/models');

class reviewsDbWrapper extends genericDbWrapper {
    constructor() {
        super(UserGameReview, [Game, User]);
    }

    async hasRecord(user, game) {
        return this.Model.findOne({
            where: {
                UserId: user.id,
                GameId: game.id,
            },
        });
    }

    async findAllGameReviews(game) {
        return this.Model.findAll({
            where: {
                GameId: game.id,
            },
        });
    }

    async findOrCreate(user, game, review) {
        const reviewObj = {
            review: review,
            UserId: user.id,
            GameId: game.id,
        };

        const excists = await this.hasRecord(user, game);
        if (excists) {
            return false;
        }

        const savedReview = await this.Model.create(reviewObj);

        return savedReview;
    }
}

module.exports = reviewsDbWrapper;
