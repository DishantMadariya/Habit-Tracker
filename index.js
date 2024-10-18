const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const habitRoutes = require('./routes/habitRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dotenv = require('dotenv');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
