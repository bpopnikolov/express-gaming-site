const express = require('express');

const dbWrapper = require('./database-wrapper');

const app = express();

require('./config/express.config').init(app);
require('./config/auth').init(app);

const attachUserToResponse = (req, res, next) => {
    res.locals.user = req.user || null;
    next();
};

app.use(attachUserToResponse);

require('./routes').init(app, dbWrapper);

module.exports = app;
