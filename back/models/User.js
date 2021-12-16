const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, loadClass: true, trim: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true, trim: true },
    gender: { type: String, default: 'nothing' },
    location: { type: String },
    token: { type: String },
  },
  { timestamps: true },
);

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  user.findOne({ token });
};

module.exports = mongoose.model('User', userSchema);
