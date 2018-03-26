const genericDbWrapper = require('./generic.db.wrapper');

const {
    Publisher,
} = require('../../db/models');

class publishersDbWrapper extends genericDbWrapper {
    constructor() {
        super(Publisher, []);
    }
}
module.exports = publishersDbWrapper;

