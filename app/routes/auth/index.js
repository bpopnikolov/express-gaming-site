const authRoutes = require('./auth.routes');


const init = (app, data) => {
    authRoutes.init(app, data);
};

module.exports = {
    init,
};
