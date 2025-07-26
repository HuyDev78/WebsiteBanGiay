const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'banned'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);