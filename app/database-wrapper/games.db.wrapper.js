const genericDbWrapper = require('./generic.db.wrapper');

const {
    Game,
} = require('../../db/models');

class gamesDbWrapper extends genericDbWrapper {
    constructor() {
        super(Game, []);
    }

    async setGameModes(gameObj, gameModes) {
        return gameObj.setGameModes(gameModes);
    }

    async setGenres(gameObj, genres) {
        return gameObj.setGenres(genres);
    }

    async setPlatforms(gameObj, platforms) {
        return gameObj.setPlatforms(platforms);
    }

    async setPublishers(gameObj, publishers) {
        return gameObj.setPublishers(publishers);
    }

    async setScreenshots(gameObj, screenshots) {
        return gameObj.setScreenshots(screenshots);
    }

    async setVideos(gameObj, videos) {
        return gameObj.setVideos(videos);
    }

    async setWebsites(gameObj, websites) {
        return gameObj.setWebsites(websites);
    }
}
module.exports = gamesDbWrapper;
