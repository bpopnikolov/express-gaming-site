/* globals __dirname */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');


const init = (app) => {
    // view engine setup
    app.set('views', path.join(__dirname, '..', '..', 'views'));
    app.set('view engine', 'pug');

    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false,
    }));

    // route: public/js/app.js
    app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')));
};

module.exports = {
    init,
};
