// const dbWrapper = require('../database-wrapper');


class GenresController {
    constructor(dbWrapper) {
        this.dbWrapper = dbWrapper;
    }

    async getGamesByGenre(genreNameStr) {
        const genreObj = await this.dbWrapper.genres.hasRecord(genreNameStr);

        if (!genreObj) {
            return genreObj;
        }

        return this.dbWrapper.genres.getGames(genreObj);
    }

    async getAllGenres() {
        return await this.dbWrapper.genres.getAll();
    }

    async getGamesInRange(genreNameStr, limit, offset) {
        const genreObj = await this.dbWrapper.genres.hasRecord(genreNameStr);

        if (!genreObj) {
            return null;
        }

        return await this.dbWrapper.genres
            .getGamesInRange(genreObj, limit, offset);
    }
}

// const getAllGenres = async (req, res, next) => {
//     res.render('genres/allGenres');
// };
module.exports = GenresController;
