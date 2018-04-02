const apiGamesRoutes = require('./api.games.routes');
const gamesRoutes = require('./games.routes');

const init = (app, dbWrapper) => {
    apiGamesRoutes.init(app, dbWrapper);
    gamesRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
