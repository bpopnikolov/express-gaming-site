const {
    Router,
} = require('express');

const init = (app, data) => {
    const rounter = new Router();
    rounter
        .get('/', async (req, res) => {
            res.render('app/home');
        });

    app.use('/', rounter);
};

module.exports = {
    init,
};
