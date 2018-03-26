const genericDbWrapper = require('./generic.db.wrapper');

const {
    Game,
} = require('../../db/models');

class gamesDbWrapper extends genericDbWrapper {
    constructor() {
        super(Game, []);
    }
}
module.exports = gamesDbWrapper;

