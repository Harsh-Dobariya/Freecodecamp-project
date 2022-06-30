const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    username: { type: String, required: true }
}));

const validateUser = (user) => {
    const userSchema = Joi.object({
        username: Joi.string().required()
    });

    return userSchema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;