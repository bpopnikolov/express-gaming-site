const appRoutes = require('./app.routes');

const init = (app, data) => {
    appRoutes.init(app, data);
};

module.exports = {
    init,
};
