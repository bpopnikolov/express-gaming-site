const genericDbWrapper = require('./generic.db.wrapper');

const {
    Genre,
} = require('../../db/models');

class genreDbWrapper extends genericDbWrapper {
    constructor() {
        super(Genre, []);
    }

    hasRecord(genreNameStr) {
        return Genre.findOne({
            where: {
                name: genreNameStr,
            },
        });
    }

    async getGames(genreObj) {
        return genreObj.getGames();
    }
}
module.exports = genreDbWrapper;

