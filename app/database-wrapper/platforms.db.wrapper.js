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

class platformsDbWrapper extends genericDbWrapper {
    constructor() {
        super(Platform, []);
    }

    async hasRecord(platformNameStr) {
        return Platform.findOne({
            where: {
                name: platformNameStr,
            },
        });
    }

    async getGames(platformObj) {
        return platformObj.getGames({
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

    async getGamesInRange(platformObj, limit, offset) {
        return platformObj.getGames({
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
module.exports = platformsDbWrapper;
