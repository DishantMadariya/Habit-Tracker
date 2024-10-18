const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createHabit, getHabits, updateHabit, deleteHabit } = require('../controllers/habitController');

const router = express.Router();

router.route('/')
    .get(protect, getHabits)
    .post(protect, createHabit);

router.route('/:id')
    .put(protect, updateHabit)
    .delete(protect, deleteHabit);

module.exports = router;
