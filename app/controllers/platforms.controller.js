class PlatformsController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    async getGamesByPlatform(platformNameStr) {
        const platformObj = await this.dbWrapper.platforms.hasRecord(platformNameStr);

        if (!platformObj) {
            return platformObj;
        }

        return this.dbWrapper.platforms.getGames(platformObj);
    }

    async getAllPlatforms() {
        return await this.dbWrapper.platforms.getAll();
    }

    async getGamesInRange(platformNameStr, limit, offset) {
        const platformObj = await this.dbWrapper.platforms.hasRecord(platformNameStr);

        if (!platformObj) {
            return null;
        }

        return await this.dbWrapper.platforms
            .getGamesInRange(platformObj, limit, offset);
    }
}

module.exports = PlatformsController;
