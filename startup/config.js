require('dotenv').config();
const config = require('config');

module.exports = () => {
    if (!config.get('db')) {
        throw new Error("Error: db is not defined.")
        process.exit(1);
    }
}