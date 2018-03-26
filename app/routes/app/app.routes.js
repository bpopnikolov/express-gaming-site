const {
    Router,
} = require('express');

const init = (app, dbWrapper) => {
    const router = new Router();
    router
        .get('/', async (req, res) => {
            console.log('User logged in: ', req.isAuthenticated());
            console.log('user: ', req.user);
            res.render('app/home');
        });

    app.use('/', router);
};

module.exports = {
    init,
};
