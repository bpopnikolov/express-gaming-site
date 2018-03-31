const dbWrapper = require('../database-wrapper');

const getAll = async (req, res, next) => {
    return dbWrapper.genres.getAll();
};

const apiGetGamesByCategory = async (req, res, next) => {
    const genreNameStr = req.params.genreName;
    const genreObj = await dbWrapper.genres.hasRecord(genreNameStr);
    if (!genreObj) {
        res.render('app/pageNotFound');
    }

    const context = {};
    context.genre = genreNameStr;

    const gamesObjsFromCateg = await dbWrapper.genres.getGames(genreObj);
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

const getGamesByCategory = async (req, res, next) => {
    const genreNameStr = req.params.genreName;
    const genreObj = await dbWrapper.genres.hasRecord(genreNameStr);
    if (!genreObj) {
        res.render('app/pageNotFound');
    }
    const context = {};
    context.genreName = genreNameStr;
    res.render('genres/gamesFromGenre', context);
};

module.exports = {
    getAll,
    apiGetGamesByCategory,
    getGamesByCategory,
};