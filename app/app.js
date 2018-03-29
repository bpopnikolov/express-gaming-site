const express = require('express');

const dbWrapper = require('./database-wrapper');
const GenresController = require('./controllers/genres.controller');
const PlatformsController = require('./controllers/platforms.controller');

const app = express();

require('./config/express.config').init(app);
require('./config/auth').init(app);

const attachUserToResponse = (req, res, next) => {
    res.locals.user = req.user || null;
    next();
};

const attachGenresToResponse = async (req, res, next) => {
    const genres = await GenresController.getAll();
    res.locals.genres = genres;
    next();
};

const attachPlatformsToResponse = async (req, res, next) => {
    const platforms = await PlatformsController.getAll();
    res.locals.platforms = platforms;
    next();
};

app.use(attachGenresToResponse);
app.use(attachPlatformsToResponse);

app.use(attachUserToResponse);

require('./routes').init(app, dbWrapper);

module.exports = app;
