const genericDbWrapper = require('./generic.db.wrapper');

const {
    Genre,
} = require('../../db/models');

class genreDbWrapper extends genericDbWrapper {
    constructor() {
        super(Genre, []);
    }
}
module.exports = genreDbWrapper;

