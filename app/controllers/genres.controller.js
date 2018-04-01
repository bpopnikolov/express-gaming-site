const dbWrapper = require('../database-wrapper');

const getAll = async (req, res, next) => {
    return dbWrapper.genres.getAll();
};

const apiGetAllGenres = async (req, res, next) => {
    const allGenresObjs = await dbWrapper.genres.getAll();
    const context = {};
    context.allGenres = allGenresObjs.map((genre) => genre.name);
    res.send(context);
};

const getAllGenres = async (req, res, next) => {
    res.render('genres/allGenres');
};

const apiGetGamesByGenre = async (req, res, next) => {
    const genreNameStr = req.params.genreName;
    const genreObj = await dbWrapper.genres.hasRecord(genreNameStr);
    if (!genreObj) {
        res.render('app/pageNotFound');
        return 0;
    }
    const context = {};
    context.genre = genreNameStr;

    const page = (req.params.page || 1)-1;
    const gamesPerPage = 2;
    const gamesFromDbStartingFrom = page * gamesPerPage;

    const gamesObjsFromCateg = await dbWrapper.genres
        .getGamesInRange(genreObj, gamesPerPage, gamesFromDbStartingFrom);

    const games = [];

    gamesObjsFromCateg.forEach((gameObj, index) => {
        const curGame = {};
        curGame.name = gameObj.name;
        curGame.summary = gameObj.summary;
        curGame.rating = gameObj.rating;
        curGame.ratingCount = gameObj.ratingCount;
        curGame.releaseDate = gameObj.releaseDate;
        curGame.coverUrl = gameObj.cover;

        curGame.gameModes = gameObj.GameModes
            .map((gameMode) => gameMode.name);

        curGame.genres = gameObj.Genres
            .map((genre) => genre.name);

        curGame.platfroms = gameObj.Platforms
            .map((platform) => platform.name);

        curGame.publishers = gameObj.Publishers
            .map((publisher) => publisher.name);

        curGame.screenshots = gameObj.Screenshots
            .map((screeshot) => screeshot.url);

        curGame.videos = gameObj.Videos
            .map((video) => video.url);

        curGame.websites = gameObj.Websites
            .map((website) => website.url);

        games.push(curGame);
    });

    context.gamesObjs = games;
    console.log(context);
    res.send(context);
};

const getGamesByGenre = async (req, res, next) => {
    const genreNameStr = req.params.genreName;
    const genreObj = await dbWrapper.genres.hasRecord(genreNameStr);
    if (!genreObj) {
        res.render('app/pageNotFound');
        return null;
    }
    const context = {};
    context.genreName = genreNameStr;
    const gamesPerPage = 2;
    context.pagesCount = Math.ceil((await dbWrapper.genres.getGames(genreObj)).length / gamesPerPage);
    res.render('genres/gamesFromGenre', context);
};

module.exports = {
    getAll,
    apiGetAllGenres,
    getAllGenres,
    apiGetGamesByGenre,
    getGamesByGenre,
};