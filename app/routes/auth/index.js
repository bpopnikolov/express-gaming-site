const authRoutes = require('./auth.routes');


const init = (app, dbWrapper) => {
    authRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
