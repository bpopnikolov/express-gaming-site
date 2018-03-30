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
    gamesObjsFromCateg.forEach((game) => console.log(game.name));

    const context = {};
    context.gamesObjs = gamesObjsFromCateg;
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