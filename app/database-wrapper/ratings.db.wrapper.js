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

    getByUserIdAndGameId(obj) {
        return this.Model.findOne({
            where: {
                userId: obj.userId,
                gameId: obj.gameId,
            },
            include: this.includes,
        });
    }

    async findOrCreateRating(obj) {
        // const ratingObj = await this.getByUserIdAndGameId(obj);

        return this.Model.findCreateFind({
            where: {
                userId: obj.userId,
                gameId: obj.gameId,
            },
            defaults: obj,
        });
    }
}

module.exports = ratingsDbWrapper;
