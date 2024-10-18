const Habit = require('../models/habitModel');

module.exports.createHabit = async (req, res) => {
    try {
        const newHabit = await Habit.create({ ...req.body, userId: req.user.userId });
        res.status(201).json(newHabit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user.userId });
        res.json(habits);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.updateHabit = async (req, res) => {
    try {
        const habit = await Habit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!habit) return res.status(404).json({ message: 'Habit not found' });
        res.json(habit);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports.deleteHabit = async (req, res) => {
    try {
        const habit = await Habit.findByIdAndDelete(req.params.id);
        if (!habit) return res.status(404).json({ message: 'Habit not found' });
        res.json({ message: 'Habit deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
