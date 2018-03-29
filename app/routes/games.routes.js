const {
    Router,
} = require('express');

const game = {
    name: 'test123',
};

const init = (app, dbWrapper) => {
    const router = new Router();

    router
        .get('/:name', async (req, res) => {
            res.render('app/games');
        });

    app.use('/', router);
};

module.exports = {
    init,
};
