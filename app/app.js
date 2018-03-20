const express = require('express');

const data = {};

const app = express();

require('./config/express.config').init(app);
require('./routes').init(app, data);

module.exports = app;
