const genericDbWrapper = require('./generic.db.wrapper');

const {
    GameMode,
} = require('../../db/models');

class gameModesDbWrapper extends genericDbWrapper {
    constructor() {
        super(GameMode, []);
    }
}
module.exports = gameModesDbWrapper;

