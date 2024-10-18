const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
        required: true
    },
    streak: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Habit', habitSchema);