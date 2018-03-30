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
    const gamesObjsFromCateg = await dbWrapper.genres.getGames(genreObj);

    const games = [];

    gamesObjsFromCateg.forEach( (gameObj, index) => {
        const curGame = {};
        curGame.name = gameObj.name;
        curGame.summary = gameObj.summary;
        curGame.rating = gameObj.rating;
        curGame.ratingCount = gameObj.ratingCount;
        curGame.releaseDate = gameObj.releaseDate;
        curGame.coverUrl = gameObj.cover;

        // const gameGenres = await gameObj.getGenres();
        // curGame.gameGenres = gameGenres.map((gameGenre) => gameGenre.name);

        const screenShots = gameObj.Screenshots;
        curGame.screenshotsUrls = screenShots.map((screenshot) => screenshot.url);
        games.push(curGame);
        // console.log(games);
        // console.log(curGame);
    });

    console.log(games);

    const context = {};
    context.gamesObjs = games;
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