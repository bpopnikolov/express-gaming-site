/* globals __dirname __filename */

const fs = require('fs');
const path = require('path');

const init = (app, dbWrapper) => {
    /** dynamically load all routes */
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        // relative to absolute path
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            const route = require(modulePath);
            route.init(app, dbWrapper);
        });


    app.use(function(req, res, next) {
        res.status(404).render('app/pageNotFound.pug',
            res.locals);
    });
};

module.exports = {
    init,
};
