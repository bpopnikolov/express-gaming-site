const express = require('express');

const data = {};

const app = express();

require('./config/express.config').init(app);
require('./config/auth').init(app);

const attachUserToResponse = (req, res, next) => {
    res.locals.user = req.user || null;
    next();
};

app.use(attachUserToResponse);

require('./routes').init(app, data);

module.exports = app;
