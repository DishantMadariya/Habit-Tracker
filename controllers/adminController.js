const User = require('../models/userModel');
const Habit = require('../models/habitModel');

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.createHabitTemplate = async (req, res) => {
    try {
        const habitTemplate = await Habit.create({ ...req.body });
        res.status(201).json(habitTemplate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
