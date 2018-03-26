const genericDbWrapper = require('./generic.db.wrapper');

const {
    Screenshot,
} = require('../../db/models');

class screenshotsDbWrapper extends genericDbWrapper {
    constructor() {
        super(Screenshot, []);
    }
}
module.exports = screenshotsDbWrapper;

