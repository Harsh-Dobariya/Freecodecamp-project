const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Url = mongoose.model('Url', new mongoose.Schema({
    original_url: {
        type: String,
        required: true
    },
    short_url: {
        type: Number,
        required: true,
        default: 0
    }
}).plugin(AutoIncrement, { id: 'url_seq', inc_field: 'short_url' }));

function validateUrl(url) {
    const regex = new RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);
    return url.match(regex)
}

exports.Url = Url;
exports.validate = validateUrl;