const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getAllUsers, createHabitTemplate } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', protect, admin, getAllUsers);
router.post('/habit-template', protect, admin, createHabitTemplate);

module.exports = router;
