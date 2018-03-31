const usersRoutes = require('./users.routes');
const apiUsersRoutes = require('./api.users.routes');

const init = (app, dbWrapper) => {
    usersRoutes.init(app, dbWrapper);
    apiUsersRoutes.init(app);
};

module.exports = {
    init,
};
