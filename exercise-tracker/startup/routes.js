const express = require('express');
const exercises = require('../routes/exercises');
const cors = require('cors');

module.exports = (app) => {
    app.use(cors());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(exercises);
}