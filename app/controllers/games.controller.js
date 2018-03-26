class GamesController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    async create(gameObj) {
        if (!gameObj.name || gameObj.name.length <= 0) {
            throw Error('Game Title Can\'t be empty!');
        }
        if (await this.dbWrapper.hasRecord(gameObj)) {
            throw Error('Game with the same title allready exists!');
        }

        if (!gameObj.summary || gameObj.summary.length <= 0) {
            gameObj.summary = 'this game have no summary';
        }

        if (!gameObj.rating) {
            gameObj.rating = 0;
        }

        if (!gameObj.releaseDate) {
            gameObj.releaseDate = null;
        }

        if (!gameObj.cover) {
            gameObj.cover = '/public/assets/img/noImg.jpg';
        }

        return this.dbWrapper.games.create(gameObj);
    }

    async setGameModes(obj, gameModes) {
        if (!Array.isArray(gameModes)) {
            return this.dbWrapper.setGameModes(obj, []);
        }
        return this.dbWrapper.setGameModes(obj, gameModes);
    }

    async setGenres(obj, genres) {
        if (!Array.isArray(genres)) {
            return this.dbWrapper.setGenres(obj, []);
        }
        return this.dbWrapper.setGenres(obj, genres);
    }

    async setPlatforms(obj, platforms) {
        if (!Array.isArray(platforms)) {
            return this.dbWrapper.setPlatforms(obj, []);
        }
        return this.dbWrapper.setPlatforms(obj, platforms);
    }

    async setPublishers(obj, publishers) {
        if (!Array.isArray(publishers)) {
            return this.dbWrapper.setPublishers(obj, []);
        }
        return this.dbWrapper.setPublishers(obj, publishers);
    }

    async setScreenshots(obj, screenshots) {
        if (!Array.isArray(screenshots)) {
            return this.dbWrapper.setScreenshots(obj, []);
        }
        return this.dbWrapper.setScreenshots(obj, screenshots);
    }

    async setVideos(obj, videos) {
        if (!Array.isArray(videos)) {
            return this.dbWrapper.setVideos(obj, []);
        }
        return this.dbWrapper.setVideos(obj, videos);
    }

    async setWebsites(obj, websites) {
        if (!Array.isArray(websites)) {
            return this.dbWrapper.setWebsites(obj, []);
        }
        return this.dbWrapper.setWebsites(obj, websites);
    }
}

module.exports = GamesController;
