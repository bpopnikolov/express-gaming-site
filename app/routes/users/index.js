const usersRoutes = require('./users.routes');


const init = (app, dbWrapper) => {
    usersRoutes.init(app, dbWrapper);
};

module.exports = {
    init,
};
