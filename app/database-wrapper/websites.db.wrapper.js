const genericDbWrapper = require('./generic.db.wrapper');

const {
    Website,
} = require('../../db/models');

class websitesDbWrapper extends genericDbWrapper {
    constructor() {
        super(Website, []);
    }
}
module.exports = websitesDbWrapper;

