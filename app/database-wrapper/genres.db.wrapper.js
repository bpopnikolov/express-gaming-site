const genericDbWrapper = require('./generic.db.wrapper');

const {
    GameMode,
    Genre,
    Platform,
    Publisher,
    Screenshot,
    Video,
    Website,
} = require('../../db/models');

class genreDbWrapper extends genericDbWrapper {
    constructor() {
        super(Genre, []);
    }

    async hasRecord(genreNameStr) {
        return Genre.findOne({
            where: {
                name: genreNameStr,
            },
        });
    }

    async getGames(genreObj) {
        return genreObj.getGames({
            include: [
                GameMode,
                Genre,
                Platform,
                Publisher,
                Screenshot,
                Video,
                Website,
            ],
        });
    }

    async getGamesInRange(genreObj, limit, offset) {
        return genreObj.getGames({
            limit: limit,
            offset: offset,

            include: [
                GameMode,
                Genre,
                Platform,
                Publisher,
                Screenshot,
                Video,
                Website,
            ],
        });
    }
}
module.exports = genreDbWrapper;