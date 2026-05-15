const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. You must define UserSchema before you can use it
const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

// 2. Now that UserSchema is defined, you can add the 'pre' hook
UserSchema.pre('save', async function() {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err; // This will stop the save and report the error
  }
});

// 3. Export the model so server.js can use it
module.exports = mongoose.model('User', UserSchema);