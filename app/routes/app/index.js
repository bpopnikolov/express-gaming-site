const appRoutes = require('./app.routes');

const init = (app, dbWrapper) => {
    appRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
