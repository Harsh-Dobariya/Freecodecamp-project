const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const exercisesSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true }
})

const Exercise = mongoose.model("Exercise", exercisesSchema);

const validateExercise = (user) => {
    const exerciseSchema = Joi.object({
        ":_id": Joi.objectId(),
        description: Joi.string().required(),
        duration: Joi.number().required(),
        date: Joi.date().allow('')
    });

    return exerciseSchema.validate(user);
}

exports.Exercise = Exercise;
exports.validateExercise = validateExercise;