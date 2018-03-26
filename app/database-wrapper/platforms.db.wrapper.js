const genericDbWrapper = require('./generic.db.wrapper');

const {
    Platform,
} = require('../../db/models');

class platformsDbWrapper extends genericDbWrapper {
    constructor() {
        super(Platform, []);
    }
}
module.exports = platformsDbWrapper;

