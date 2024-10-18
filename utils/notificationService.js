const User = require('../models/userModel');

module.exports.sendReminder = async (userId, habit) => {
    try {
        const user = await User.findById(userId);
        if (user) {
            console.log(`Reminder: Hey ${user.username}, don't forget to complete your habit: ${habit.name}`);
        }
    } catch (error) {
        console.error(`Failed to send reminder to user: ${userId}`, error);
    }
};
