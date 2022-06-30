require('dotenv').config();
const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
    const db = config.get('db');
    mongoose.connect(db)
        .then(() => console.log('Connected to MongoDB...'))
        .catch(() => console.log(`Couldn't connect to MongoDB...`));
}