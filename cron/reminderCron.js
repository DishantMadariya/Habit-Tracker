const cron = require('node-cron');
const Habit = require('../models/habitModel');
const notificationService = require('../utils/notificationService');

cron.schedule('0 9 * * *', async () => {
    try {
        const habits = await Habit.find({ frequency: 'daily' });
        habits.forEach(habit => {
            notificationService.sendReminder(habit.userId, habit);
        });
    } catch (error) {
        console.error('Error sending reminders:', error.message);
    }
});
