const express = require('express');
const router = express.Router();

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// REGISTER ROUTE
router.post('/register', async (req, res) => {

  const { email, password } = req.body;

  try {

    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    // CREATE USER
    const user = new User({
      email,
      password
    });

    // SAVE USER
    await user.save();

    res.json({
      success: true,
      msg: "Admin registered successfully"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});


// LOGIN ROUTE
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

  try {

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User does not exist"
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        email: user.email
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

});

module.exports = router;