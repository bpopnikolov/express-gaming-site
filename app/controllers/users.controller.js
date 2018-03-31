const dbWrapper = require('../database-wrapper');

const getUserIdByEmail = async (req, res, next) => {
    const gameName = req.params.gameName;
    const gameObj = await dbWrapper.games.getByName(gameName);

    if (!gameObj) {
        res.render('app/pageNotFound');
    }

    const context = {
        gameObj,
    };

    res.render('app/games', context);
};

module.exports = {

};
