const dbWrapper = require('../database-wrapper');


const getAll = async (req, res, next) => {
    return dbWrapper.genres.getAll();
};

<<<<<<< HEAD
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

=======
>>>>>>> 6e18fff1bf8dbe8c871be47e71ed614458943136
module.exports = {
    getAll,
    apiGetGamesByCategory,
    getGamesByCategory,
};