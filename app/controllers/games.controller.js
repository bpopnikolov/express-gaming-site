const dbWrapper = require('../database-wrapper');

const getByName = async (req, res, next) => {
    const gameName = req.params.gameName;
    // console.log(gameName);
    // console.log('ala balasa');
    const gameObj = await dbWrapper.games.getByName(gameName);

    if (!gameObj) {
        res.render('app/pageNotFound');
    }

    const context = {
        gameObj,
    };

    // console.log(gameObj);

    // res.send(context);
    res.render('app/games', context);
};

module.exports = {
    getByName,
};
