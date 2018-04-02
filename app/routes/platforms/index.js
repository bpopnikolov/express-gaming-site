const apiPlatformsRoutes = require('./api.platforms.routes');
const platformsRoutes = require('./platforms.routes');

const init = (app, dbWrapper) => {
    apiPlatformsRoutes.init(app, dbWrapper);
    platformsRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
