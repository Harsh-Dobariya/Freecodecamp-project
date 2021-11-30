const express = require('express');
const urls = require('../routes/urls');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use('/public', express.static(`${process.cwd()}/public`));
    app.use(express.urlencoded({ extended: true }));
    app.use(urls);
    app.use(error);
}