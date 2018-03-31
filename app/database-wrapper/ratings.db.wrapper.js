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

    
}

module.exports = ratingsDbWrapper;
