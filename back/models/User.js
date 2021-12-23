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

userSchema.methods.generateToken = function (cb) {
  var user = this;

  var token = jwt.sign(user._id.toString(), process.env.JWT_SCRET_KEY);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, process.env.JWT_SCRET_KEY, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, doc) {
      if (err) return cb(err);
      cb(null, doc);
    });
  });
};

module.exports = mongoose.model('User', userSchema);
