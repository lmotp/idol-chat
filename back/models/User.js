const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, loadClass: true, trim: true },
    password: { type: String, required: true, trim: true },
    nickname: { type: String, required: true, trim: true },
    profileimg: { type: String, default: 'https://pbs.twimg.com/media/FHsyhNHaIAgu6Hy?format=jpg&name=240x240' },
    myself: { type: String, maxlength: 60, default: '안녕하세요? 잘 부탁드립니다' },
    gender: { type: String, default: 'nothing' },
    location: { type: String },
    token: { type: String },
    firstCategory: { type: Boolean, default: false },
    category: [String],
    myClass: [String],
    inviteMessage: [{ info: { type: String, ref: 'Class' }, createdTime: { type: Date } }],
    loginTime: { type: Date, default: new Date() },
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
