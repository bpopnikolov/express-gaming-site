const genericDbWrapper = require('./generic.db.wrapper');

const {
    Game,
    Genre,
    Platform,
    Publisher,
    Screenshot,
    Video,
} = require('../../db/models');

class gamesDbWrapper extends genericDbWrapper {
    constructor() {
        super(Game, [Genre, Platform, Publisher, Screenshot,
                    Video]);
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

    async getByName(nameInput) {
        // console.log(this.includes);
        return this.Model.findOne({
            where: {
                name: nameInput,
            },
            include: this.includes,
        });
    }

    async getScreenshots(gameObj) {
        return gameObj.getScreenshots();
    }
    async getVideos(gameObj) {
        return gameObj.getVideos();
    }
}
module.exports = gamesDbWrapper;
