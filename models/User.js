const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  bloodType: { type: String, required: true },
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
