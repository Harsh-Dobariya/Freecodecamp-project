const { User, validateUser } = require('../models/user');
const { Exercise, validateExercise } = require('../models/exercise');
const valideObjectId = require('../middleware/valideObjectId');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/views/index.html')
});

router.get('/api/users', async (req, res) => {
    const user = await User.find();
    if (!user) return res.status(404).send("User not found.");

    res.send(user);
});

router.get('/api/users/:_id/logs', valideObjectId, async (req, res) => {
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);
    const limit = parseInt(req.query.limit);

    let date = {}
    if (from.toString() != "Invalid Date") {
        date["$gte"] = from;
    }
    if (to.toString() != "Invalid Date") {
        date["$lte"] = to;
    }

    const user = await User.findById(req.params._id);
    if (!user) return res.status(404).send("User not found.");

    let exercises;
    if (Object.keys(date).length === 0) {
        exercises = await Exercise.find({ userId: user._id });
    }
    else {
        exercises = await Exercise.find({ userId: user._id, date: date });
    }

    if (limit) {
        exercises = exercises.slice(0, limit);
    }

    const count = exercises.length;

    res.send({
        _id: user._id.toString(),
        username: user.username,
        count,
        log: exercises.map(ex => {
            return {
                description: ex.description,
                duration: ex.duration,
                date: ex.date.toDateString(),
            }
        })
    })
});

router.post('/api/users', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User({ username: req.body.username });
    user = await user.save();

    res.send({ username: user.username, _id: user._id });
});

router.post('/api/users/:_id/exercises', async (req, res) => {
    const { error } = validateExercise(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params._id);
    if (!user) return res.status(404).send("User not found.");

    const { description, duration } = req.body;
    const userId = user._id;

    let date = new Date(req.body.date);
    if (date.toString() === "Invalid Date") {
        date = new Date();
        let exercise = new Exercise({ userId, description, duration, date });
        exercise = await exercise.save();
    }
    else {
        let exercise = new Exercise({ userId, description, duration, date });
        exercise = await exercise.save();
    }

    res.send({
        _id: user._id,
        username: user.username,
        date: date.toDateString(),
        duration: parseInt(duration),
        description
    });
});

module.exports = router;