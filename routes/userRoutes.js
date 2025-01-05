const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user details
router.post('/getUser', async (req, res) => {
  const { name, code } = req.body;
  try {
    const user = await User.findOne({ name, code });
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err });
  }
});

// Save new user details
router.post('/addUser', async (req, res) => {
  const { name, code, age, gender, height, phoneNumber, bloodType } = req.body;
  try {
    const newUser = new User({ name, code, age, gender, height, phoneNumber, bloodType });
    await newUser.save();
    res.json({ success: true, message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error saving user', error: err });
  }
});

module.exports = router;
