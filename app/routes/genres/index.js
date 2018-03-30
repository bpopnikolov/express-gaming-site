const apiGenresRoutes = require('./api.genres.routes');
const genresRoutes = require('./genres.routes');

const init = (app, dbWrapper) => {
    apiGenresRoutes.init(app, dbWrapper);
    genresRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
