const genericDbWrapper = require('./generic.db.wrapper');

const {
    Video,
} = require('../../db/models');

class videosDbWrapper extends genericDbWrapper {
    constructor() {
        super(Video, []);
    }
}
module.exports = videosDbWrapper;

