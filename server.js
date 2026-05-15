console.log("Mongo URI:", process.env.MONGO_URI);
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Models and Routes
const User = require('./models/User'); 
const authRoutes = require('./routes/authRoutes'); // Matches Screenshot 2026-05-13 232005.png
const emailRoutes = require('./routes/emailRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Error:", err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// THE ALTERNATIVE FIX: Use a regular expression for the catch-all
// This avoids the 'path-to-regexp' parameter naming issue entirely
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));