const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
    const db = config.get('db');
    mongoose.connect(db)
        .then(() => console.log(`Connected to MongoDB....${db}`))
        .catch(() => console.log('Could not conneted to MongoDB....'));
}